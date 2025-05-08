'use client'
import React from 'react'

export default function WeatherAlerts({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null

  return (
    <div className="bg-red-500/20 border-l-4 border-red-600 p-4 mt-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">⚠️ Alertes Météo</h2>
      {data.map((alert, index) => (
        <div key={index} className="mb-2">
          <p className="font-semibold">{alert.event}</p>
          <p>{alert.description}</p>
          <p className="text-sm text-white/70">
            ⏱ {new Date(alert.start * 1000).toLocaleString()} → {new Date(alert.end * 1000).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}
