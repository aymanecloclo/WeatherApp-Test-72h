'use client';

import { Eye, MapPin, Navigation } from 'lucide-react';

interface GeoProps {
  lat: number;
  lon: number;
  visibility: number;
}

export default function GeoInfo({ lat, lon, visibility }: GeoProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg my-5">
      <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-400/20 border border-blue-400 text-blue-300 rounded-md p-2">
              <Navigation className="w-5 h-5" />
            </div>
            <span className="text-white/80">Latitude</span>
          </div>
          <span className="font-medium">{lat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-green-400/20 border border-green-400 text-green-300 rounded-md p-2">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-white/80">Longitude</span>
          </div>
          <span className="font-medium">{lon.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-400/20 border border-purple-400 text-purple-300 rounded-md p-2">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-white/80">Visibility</span>
          </div>
          <span className="font-medium">{visibility} km</span>
        </div>
      </div>
    </div>
  );
}
