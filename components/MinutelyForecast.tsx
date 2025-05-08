'use client'
import React from 'react'

export default function MinutelyForecast({ data }: { data: any[] }) {
  return (
    <div className="bg-white/20 p-4 mt-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Prévisions Minute par Minute (1h)</h2>
      <ul className="text-sm max-h-40 overflow-y-auto">
        {data.map((minute, index) => (
          <li key={index}>
            {new Date(minute.dt * 1000).toLocaleTimeString()} - Précipitations : {minute.precipitation} mm
          </li>
        ))}
      </ul>
    </div>
  )
}
