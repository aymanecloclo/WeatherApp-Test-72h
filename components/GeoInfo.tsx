'use client';
interface GeoProps {
  lat: number;
  lon: number;
  visibility: number;
}

export default function GeoInfo({ lat, lon,visibility }: GeoProps) {
  return (
 <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/80">Latitude</span>
          <span className="text-white font-medium">{lat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80">Longitude</span>
          <span className="text-white font-medium">{lon.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80">Visibility</span>
          <span className="text-white font-medium">{visibility} km</span>
        </div>
      </div>
    </div>
  );
}
