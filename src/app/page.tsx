'use client'
import { useState, useEffect } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import WeatherSearch from '../../components/WeatherSearch'
import SunriseSunset from '../../components/SunriseSunset'
import GeoInfo from '../../components/GeoInfo'
import AirQuality from '../../components/AirQuality'
import WeatherDetails from '../../components/WeatherDetails'
import { FiSun, FiCloudRain, FiCloudSnow, FiCloud, FiWind } from 'react-icons/fi'

export default function Home() {
  const [weatherTheme, setWeatherTheme] = useState<'default' | 'sunny' | 'rainy' | 'snowy' | 'cloudy'>('default')
  const [weatherData, setWeatherData] = useState<any>(null)
  const [city, setCity] = useState<string>('Paris')

  const fetchWeather = async (selectedCity: string) => {
    try {
      const res = await axiosInstance.get(`/weather?city=${selectedCity}`)
      setWeatherData(res.data)
      setCity(selectedCity)

      // 🎨 Déduire le thème en fonction du weather
      const weatherMain = res.data.weather.weather[0]?.main?.toLowerCase() || ''
      if (weatherMain.includes('sun')) setWeatherTheme('sunny')
      else if (weatherMain.includes('rain')) setWeatherTheme('rainy')
      else if (weatherMain.includes('snow')) setWeatherTheme('snowy')
      else if (weatherMain.includes('cloud')) setWeatherTheme('cloudy')
      else setWeatherTheme('default')

    } catch (err) {
      console.error('Erreur météo:', err)
    }
  }

  useEffect(() => {
    fetchWeather(city) // Fetch au chargement initial
  }, [])

  const getBackground = () => {
    switch (weatherTheme) {
      case 'sunny': return 'bg-gradient-to-br from-amber-400 to-orange-500'
      case 'rainy': return 'bg-gradient-to-br from-slate-500 to-blue-700'
      case 'snowy': return 'bg-gradient-to-br from-cyan-200 to-blue-400'
      case 'cloudy': return 'bg-gradient-to-br from-gray-400 to-gray-600'
      default: return 'bg-gradient-to-br from-blue-500 to-indigo-700'
    }
  }

  const getWeatherIcon = () => {
    switch (weatherTheme) {
      case 'sunny': return <FiSun className="text-amber-300 text-4xl animate-pulse" />
      case 'rainy': return <FiCloudRain className="text-blue-400 text-4xl animate-bounce" />
      case 'snowy': return <FiCloudSnow className="text-cyan-200 text-4xl animate-spin-slow" />
      case 'cloudy': return <FiCloud className="text-gray-300 text-4xl" />
      default: return <FiWind className="text-indigo-300 text-4xl animate-spin" />
    }
  }

  return (
    <main className={`min-h-screen ${getBackground()} p-4 transition-all duration-500 ease-in-out flex w-full`}>
      <div className="md:w-7/12 border">
        {weatherData ? (
          <>
            <WeatherDetails data={weatherData.weather} />
            <SunriseSunset
              sunrise={weatherData.weather.sys.sunrise}
              sunset={weatherData.weather.sys.sunset}
            />
            <AirQuality aqi={weatherData.pollution.list[0].main.aqi} />
            <GeoInfo lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
          </>
        ) : (
          <p className="text-white">Chargement des données météo...</p>
        )}
      </div>

      <div className="md:w-5/12 border">
        {/* Header animé */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {getWeatherIcon()}
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Climatic<span className="font-light">.io</span>
            </h1>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-white">🌎</span>
          </div>
        </div>

        {/* Widget principal */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <WeatherSearch setTheme={setWeatherTheme} onSearch={fetchWeather} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/70 text-sm">
          <p>Données météo en temps réel • API OpenWeather</p>
        </div>
      </div>
    </main>
  )
}
