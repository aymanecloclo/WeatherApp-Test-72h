'use client'
import { WiHumidity, WiStrongWind, WiBarometer } from 'react-icons/wi'

interface WeatherMetricsProps {
  data: {
    humidity: number
   
    pressure: number
  }, wind: number
}

export default function WeatherMetrics({ data,wind }: WeatherMetricsProps) {
  const metrics = [
    {
      id: 'humidity',
      icon: <WiHumidity className="text-3xl text-blue-400" />,
      label: 'Humidité',
      value: `${data.humidity}%`,
      color: 'bg-blue-500/10'
    },
    {
      id: 'wind',
      icon: <WiStrongWind className="text-3xl text-cyan-400" />,
      label: 'Vent',
      value: `${wind} km/h`,
      color: 'bg-cyan-500/10'
    },
    {
      id: 'pressure',
      icon: <WiBarometer className="text-3xl text-purple-400" />,
      label: 'Pression',
      value: `${data.pressure} hPa`,
      color: 'bg-purple-500/10'
    }
  ]

  return (
    <>
      <h2 className='text-blue-900 text-lg  font-semibold '>Météo description :</h2>

    <div className="grid grid-cols-3 gap-4 my-5">
      
      {metrics.map((metric) => (
        
        <div
          key={metric.id}
          className={`flex flex-col  items-center p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${metric.color} bg-white/20 backdrop-blur-3xl rounded-2xl overflow-hidden shadow-2xl border border-white/30 p-4`}
        >
          
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-white/10 ">
              {metric.icon}
            </div>
            <span className="text-sm font-medium text-white/80 uppercase tracking-wider">
              {metric.label}
            </span>
          </div>
          <span className="text-2xl font-bold text-white">
            {metric.value}
          </span>
        </div>
      ))}
    </div>
    </>
  )
}