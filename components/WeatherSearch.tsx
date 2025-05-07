'use client'

import { useState } from 'react'
import WeatherCard from '../components/WeatherCard'

export default function WeatherSearch() {
  const [city, setCity] = useState('Paris')
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchWeather = async () => {
    if (!city) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()
      setWeather(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville"
          className="flex-1 p-2 rounded bg-white/10 text-white placeholder-white/50"
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="px-4 py-2 bg-white/20 rounded hover:bg-white/30 disabled:opacity-50"
        >
          {loading ? 'Chargement...' : 'Rechercher'}
        </button>
      </div>

      {weather && <WeatherCard data={weather} />}
    </div>
  )
}