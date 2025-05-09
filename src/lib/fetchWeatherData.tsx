// lib/weatherApi.ts
import axios from 'axios'
import redis from '../../lib/redis'

export async function fetchWeatherData(city: string) {
    const API_KEY = process.env.OPENWEATHER_API_KEY
    const cacheKey = `weather:${city.toLowerCase()}`

    // Vérifier le cache Redis
    try {
        const cached = await redis.get(cacheKey)
        if (cached) return JSON.parse(cached)
    } catch (error) {
        console.error('Redis error:', error)
    }

    // Récupérer les données de l'API
    try {
        const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'fr'
            },
            timeout: 5000
        })

        const { coord } = weatherRes.data

        // Récupérer la pollution
        let pollution = null
        if (coord) {
            const pollutionRes = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
                params: {
                    lat: coord.lat,
                    lon: coord.lon,
                    appid: API_KEY
                }
            })
            pollution = pollutionRes.data.list[0] || null
        }

        const responseData = {
            city,
            coord,
            weather: weatherRes.data,
            pollution,
            timestamp: Date.now()
        }

        // Mettre en cache
        await redis.setex(cacheKey, 300, JSON.stringify(responseData))

        return responseData
    } catch (error) {
        console.error('API error:', error)
        return null
    }
}