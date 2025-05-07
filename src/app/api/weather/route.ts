import axios from 'axios'
import redis from '../../../../lib/redis'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city') || 'Paris'

    const cacheKey = `weather:${city.toLowerCase()}`
    let cachedData = null

    // 🔁 Lire cache Redis
    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        try {
          cachedData = JSON.parse(cached)
        } catch {
          await redis.del(cacheKey) // Cache corrompu
        }
      }
    } catch (err) {
      console.error('Erreur Redis:', err)
    }

    if (cachedData) {
      return NextResponse.json({ ...cachedData, source: 'cache' })
    }

    const apiKey = '7ab4338a56030b82d25ba8a78b578696'

    // ☁️ Appel à /weather avec Axios
    const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    })

    const weatherData = weatherRes.data
    const { lat, lon } = weatherData.coord

    if (!lat || !lon) throw new Error('Coordonnées absentes')

    // 🏭 Pollution
    const pollutionRes = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
      params: {
        lat,
        lon,
        appid: apiKey,
      },
    })

    const fullData = {
      city,
      weather: weatherData,
      pollution: pollutionRes.data,
      coord: { lat, lon },
    }

    await redis.setex(cacheKey, 300, JSON.stringify(fullData))

    return NextResponse.json({ ...fullData, source: 'api' })

  } catch (error: any) {
    console.error('❌ Erreur API Axios:', error.message)
    return NextResponse.json(
      {
        error: 'Erreur serveur',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
