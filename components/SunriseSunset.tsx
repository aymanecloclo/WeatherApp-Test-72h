'use client';

import { Sunrise, Sunset } from 'lucide-react';
import React from 'react';

interface Props {
  sunrise: number;
  sunset: number;
}

function formatTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function SunriseSunset({ sunrise, sunset }: Props) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Sun & Moon</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-300/20 border border-yellow-300 text-yellow-300 rounded-md p-2">
              <Sunrise className="w-5 h-5" />
            </div>
            <span className="text-white/80">Sunrise</span>
          </div>
          <span className="font-medium">{formatTime(sunrise)}</span>
        </div>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-400/20 border border-orange-400 text-orange-400 rounded-md p-2">
              <Sunset className="w-5 h-5" />
            </div>
            <span className="text-white/80">Sunset</span>
          </div>
          <span className="font-medium">{formatTime(sunset)}</span>
        </div>
      </div>
    </div>
  );
}
