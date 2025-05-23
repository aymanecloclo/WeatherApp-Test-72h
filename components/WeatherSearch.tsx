'use client'

import { useCallback } from 'react'
import { FiSearch, FiLoader } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import WeatherCard from '../components/WeatherCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather, setCity } from '../src/redux/weatherSlice'
import type { RootState } from '../src/redux/store' 
import { Input } from '@/components/ui/input'
export default function WeatherSearch() {
  const dispatch = useDispatch()

  // Utilisation directe des sélecteurs
  const weather = useSelector((state: RootState) => state.weather.data)
  const city = useSelector((state: RootState) => state.weather.city)
  const loading = useSelector((state: RootState) => state.weather.loading)
  const error = useSelector((state: RootState) => state.weather.error)
  const theme = useSelector((state: RootState) => state.weather.theme)

  const fetchWeatherData = useCallback(() => {
    dispatch(fetchWeather(city) as any)
  }, [city, dispatch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchWeatherData()
    }
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCity(e.target.value));

  }
// dfdf
  return (
    <div className={`md:max-w-md w-full  md:mx-auto p-4 ${theme}`}>
      <h1 className="text-2xl font-bold text-center mb-6 text-white">Météo en temps réel</h1>

      <div className="flex gap-2 mb-6">
        <Input
          value={city}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
          placeholder="Entrez une ville..."
          className="flex-1 p-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60"
        />


        <Button
          onClick={fetchWeatherData}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2 transition-colors"
          aria-label="Rechercher"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              <span>Chargement</span>
            </>
          ) : (
            <>
              <FiSearch />
          
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-500/20 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {loading && !weather && (
        <div className="flex justify-center py-8">
          <FiLoader className="animate-spin text-2xl text-white" />
        </div>
      )}

      {weather && !error && <WeatherCard data={weather} />}

      {!weather && !loading && !error && (
        <div className="text-center py-8 text-white/70">
          Aucune donnée météo disponible
        </div>
      )}
    </div>
  )
}