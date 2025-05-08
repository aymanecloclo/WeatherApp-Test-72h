'use client'
import React from 'react'

export default function HistoricalData({ data }: { data: any }) {
  const { current } = data
  return (
    <div className="bg-white/20 p-4 mt-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Données Historiques</h2>
      <p>Date : {new Date(current.dt * 1000).toLocaleDateString()}</p>
      <p>Température : {current.temp}°C</p>
      <p>Conditions : {current.weather[0].description}</p>
    </div>
  )
}
