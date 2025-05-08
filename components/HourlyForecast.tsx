'use client'
import React from 'react'

export default function HourlyForecast({ data }: { data: any[] }) {
  return (
    <div className="bg-white/20 p-4 mt-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Prévisions Horaires (48h)</h2>
      <ul className="text-sm max-h-40 overflow-y-auto">
        {data.slice(0, 12).map((hour, index) => (
          <li key={index}>
            {new Date(hour.dt * 1000).toLocaleTimeString()} - 🌡 {hour.temp}°C | 🌥 {hour.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  )
}
