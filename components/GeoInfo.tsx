'use client';
interface GeoProps {
  lat: number;
  lon: number;
}

export default function GeoInfo({ lat, lon }: GeoProps) {
  return (
    <div className="text-white mt-4">
      <p>📍 Latitude : {lat.toFixed(2)}</p>
      <p>📍 Longitude : {lon.toFixed(2)}</p>
    </div>
  );
}
