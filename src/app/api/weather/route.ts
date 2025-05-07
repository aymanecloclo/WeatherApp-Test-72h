import axios from 'axios'
import redis from '../../../../lib/redis'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // 5 minutes

interface WeatherResponse {
  coord: {
    lat: number
    lon: number
  }
  [key: string]: any
}

interface PollutionResponse {
  list: {
    main: {
      aqi: number
    }
    components: {
      [key: string]: number
    }
  }[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')?.trim() || 'Paris'

  if (!city) {
    return NextResponse.json(
      { error: "Le paramètre 'city' est requis" },
      { status: 400 }
    )
  }

  // Configuration
  const API_KEY = process.env.OPENWEATHER_API_KEY
  const CACHE_TTL = 300 // 5 minutes en secondes
  const cacheKey = `weather:${city.toLowerCase()}`

  if (!API_KEY) {
    console.error('❌ Clé API OpenWeather manquante')
    return NextResponse.json(
      { error: 'Configuration serveur invalide' },
      { status: 500 }
    )
  }

  try {
    // 1. Vérifier le cache Redis
    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        try {
          const cachedData = JSON.parse(cached)
          return NextResponse.json({ ...cachedData, source: 'cache' })
        } catch (parseError) {
          console.error('Erreur de parsing du cache:', parseError)
          await redis.del(cacheKey)
        }
      }
    } catch (redisError) {
      console.error('Erreur Redis:', redisError)
    }

    // 2. Récupérer les données météo
    const weatherParams = {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'fr'
    }

    const weatherRes = await axios.get<WeatherResponse>(
      'https://api.openweathermap.org/data/2.5/weather',
      { params: weatherParams, timeout: 5000 }
    )

    const { coord } = weatherRes.data
    if (!coord?.lat || !coord?.lon) {
      throw new Error('Coordonnées géographiques manquantes')
    }

    // 3. Récupérer les données de pollution
    const pollutionRes = await axios.get<PollutionResponse>(
      'https://api.openweathermap.org/data/2.5/air_pollution',
      { 
        params: {
          lat: coord.lat,
          lon: coord.lon,
          appid: API_KEY
        },
        timeout: 5000
      }
    )

    // 4. Formater la réponse
    const responseData = {
      city,
      weather: weatherRes.data,
      pollution: pollutionRes.data.list[0] || null,
      coord,
      timestamp: Date.now()
    }

    // 5. Mettre en cache
    try {
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(responseData))
    } catch (cacheError) {
      console.error('Erreur de mise en cache:', cacheError)
    }

    return NextResponse.json({ ...responseData, source: 'api' })

  } catch (error: any) {
    console.error('Erreur API:', error.message)

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500
      const message = error.response?.data?.message || 'Erreur de communication avec le service météo'
      
      return NextResponse.json(
        { error: message },
        { status }
      )
    }

    return NextResponse.json(
      { error: 'Erreur de traitement', details: error.message },
      { status: 500 }
    )
  }
}