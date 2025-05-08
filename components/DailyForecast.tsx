'use client'
import React from 'react'

export default function DailyForecast({ data }: { data: any[] }) {
  return (
    <div className="bg-white/20 p-4 mt-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Prévisions Journalières (8 jours)</h2>
      <ul className="text-sm">
        {data.map((day, index) => (
          <li key={index}>
            {new Date(day.dt * 1000).toLocaleDateString()} - 🌡 {day.temp.day}°C | 🌙 {day.temp.night}°C | ☁ {day.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  )
}
