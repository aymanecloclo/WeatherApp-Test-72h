'use client'

export default function WeatherCard({ data }: { data: any }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-5xl font-bold">
          {Math.round(data.main.temp)}°C
        </span>
        <div className="text-right">
          <p className="capitalize">{data.weather[0].description}</p>
          <p>Humidité : {data.main.humidity}%</p>
          <p>Vent : {data.wind.speed} km/h</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-white/70">
        Données {data.source === 'cache' ? 'en cache' : 'fraîches'}
      </p>
    </div>
  )
}