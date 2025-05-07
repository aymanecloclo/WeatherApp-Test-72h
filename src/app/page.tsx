'use client'
import { useState, useEffect, useCallback } from 'react'
import WeatherCard from '../../components/WeatherCard'
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

  const fetchWeather = useCallback(async (selectedCity: string) => {
    try {
      const res = await axiosInstance.get(`/weather?city=${selectedCity}`)
      setWeatherData(res.data)
      setCity(selectedCity)

      const weatherMain = res.data.weather.weather[0]?.main?.toLowerCase() || ''
      setWeatherTheme(
        weatherMain.includes('sun') ? 'sunny' :
        weatherMain.includes('rain') ? 'rainy' :
        weatherMain.includes('snow') ? 'snowy' :
        weatherMain.includes('cloud') ? 'cloudy' :
        'default'
      )
    } catch (err) {
      console.error('Erreur météo:', err)
      setWeatherData(null) 
    }
  }, [])

  useEffect(() => {
    fetchWeather(city) 
  }, [city, fetchWeather])
console.log(weatherData);
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
    <main className={`min-h-screen bg-blue-400 p-4 transition-all duration-500 ease-in-out flex flex-col md:flex-row`}>
      <div className="md:w-8/12 rounded-lg shadow-xl p-6">
        {weatherData ? (
          <>
            <WeatherDetails data={weatherData.weather.main} wind={weatherData.weather.wind.speed}  />
            <SunriseSunset
              sunrise={weatherData.weather.sys.sunrise}
              sunset={weatherData.weather.sys.sunset}
            />
            <GeoInfo lat={weatherData.coord.lat} lon={weatherData.coord.lon} visibility={weatherData.coord.visibility}  />
          </>
        ) : (
          <p className="text-white text-lg animate-pulse">Chargement des données météo...</p>
        )}
      </div>

      <div className="md:w-4/12 rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {getWeatherIcon()}
            <h1 className="text-4xl font-semibold text-white drop-shadow-lg">
              Climatic<span className="font-light">.io</span>
            </h1>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center cursor-pointer">
            <span className="text-white text-xl">🌎</span>
          </div>
        </div>

        {/* Search Widget */}
        <div className="bg-white/20 backdrop-blur-3xl rounded-2xl overflow-hidden shadow-2xl border border-white/30 p-4">
          <WeatherSearch setTheme={setWeatherTheme} onSearch={fetchWeather} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/70 text-sm">
          <p>Donnees météo en temps réel • API OpenWeather</p>
        </div>
      </div>
    </main>
  )
}
