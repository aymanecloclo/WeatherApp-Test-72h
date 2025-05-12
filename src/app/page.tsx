'use client'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { fetchWeather } from '../redux/weatherSlice'
import { FiSun, FiCloudRain, FiCloudSnow, FiCloud, FiWind } from 'react-icons/fi'
import WeatherDetails from '../../components/WeatherDetails'
import SunriseSunset from '../../components/SunriseSunset'
import GeoInfo from '../../components/GeoInfo'
import WeatherSearch from '../../components/WeatherSearch'
import WeatherFooter from '../../components/WeatherFooter'

import LoadingSpinner from '../../components/LoadingSpinner'
import Image from 'next/image'
import AirQuality from '../../components/AirQuality'


export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    data: weatherData,
    city,
    error ,
    theme: weatherTheme,
    loading
  } = useSelector((state: RootState) => state.weather)

  useEffect(() => {
   
    if (!city || city === 'Paris') {  
      dispatch(fetchWeather('Paris'));
      document.title = "Météo en temps réel";
    }
  }, [dispatch]); 

  useEffect(() => {

    if (weatherData) {
      const cityName = weatherData.city;
      const temp = Math.round(weatherData.weather.main.temp);
      const description = weatherData.weather.weather[0].description;
      document.title = `${cityName} | ${temp}°C | ${description}`;
    }
  }, [weatherData]);

  // Safe date handling
  const getDateInfo = () => {
    if (!weatherData?.timestamp) {
      return {
        hours: new Date().getHours(),
        formattedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        formattedDate: new Date().toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })
      }
    }

    const date = new Date(weatherData.timestamp)
    return {
      hours: date.getHours(),
      formattedTime: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      formattedDate: date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })
    }
  }

  const { hours, formattedTime, formattedDate } = getDateInfo();
  const getTimeOfDay = () => {
    if (hours >= 5 && hours < 12) return 'Morning';
    if (hours >= 12 && hours < 17) return 'Afternoon';
    if (hours >= 17 && hours < 21) return 'Evening';
    return 'Night';
  };


  if (loading && !weatherData) {
    return <LoadingSpinner />;
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
    <main className={`min-h-screen bg-blue-400 md:p-4 transition-all duration-500 ease-in-out flex flex-col md:flex-row`}>

      <div className=" md:order-1 order-2 md:w-8/12 rounded-lg shadow-xl p-6">
        {weatherData ? (
          <>
            <div className="  ">
              <div className=" hidden md:flex  flex-col gap-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-blue-900 text-4xl font-light flex items-center gap-2">
                    {getWeatherIcon()}
                    Good <span className="font-medium">{getTimeOfDay()}</span>
                  </h1>
                </div>


                <div className="flex items-center gap-3 ">
                  <span className="text-lg text-blue-900/90">
                    {formattedDate}
                  </span>
                  <span className="text-lg font-mono font-medium text-blue-900 flex items-center">
                    {formattedTime}
                  </span>
                </div>
              </div>


              <div className=" flex md:flex-row flex-col gap-12">
                
                < AirQuality components={weatherData?.pollution?.components} aqi={weatherData?.pollution?.main.aqi} />
                <div className="md:w-6/12">
                
                  <WeatherDetails
                    data={weatherData.weather.main}
                    wind={weatherData.weather.wind.speed}
                  />
                  <SunriseSunset
                    sunrise={weatherData.weather.sys?.sunrise}
                    sunset={weatherData.weather.sys?.sunset}
                  />
                  <GeoInfo
                    lat={weatherData?.coord?.lat}
                    lon={weatherData?.coord?.lon}
                    visibility={weatherData.weather?.visibility}
                  />
                </div>
              </div>
      
            </div>
          </>
        ) : (
          <p className="text-white text-lg animate-pulse">
            {loading ? 'Chargement des données météo...' : 'Aucune donnée disponible'}
          </p>
        )}
      </div>

      <div className="order-1 md:w-4/12 rounded-lg shadow-xl p-6 md:mt-32">
      <div className="md:hidden  ">
        {weatherData ? (
          <>
            <div className="">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-blue-900 text-4xl font-light flex items-center gap-2">
                    {getWeatherIcon()}
                    Good <span className="font-medium">{getTimeOfDay()}</span>
                  </h1>
                </div>

                <div className="flex items-center gap-3  mb-5">
                  <span className="text-lg text-blue-900/90">
                    {formattedDate}
                  </span>
                  <span className="text-lg font-mono font-medium text-blue-900 flex items-center">
                    {formattedTime}
                  </span>
                </div>
              </div>


          
            </div>
          </>
        ) : (
          <p className="text-white text-lg animate-pulse">
            {loading ? 'Chargement des données météo...' : 'Aucune donnée disponible'}
          </p>
        )}
        </div>
        {/* Search Widget - inchangé */}
        <div className= " bg-white/20 backdrop-blur-3xl rounded-2xl overflow-hidden shadow-2xl border border-white/30 p-4">
          <WeatherSearch />
        </div>

        {/* Footer - inchangé */}
        <div className="mt-8 text-center text-white/70 text-sm">
          <p>Donnees météo en temps réel • API OpenWeather</p>
        </div>
      </div>
    
    </main>
  )
}