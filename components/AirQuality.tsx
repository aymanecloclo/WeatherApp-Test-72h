'use client';
interface AirProps {
  aqi: number;
}

function getAQIDescription(aqi: number) {
  const levels = ['Bon', 'Correct', 'Moyen', 'Mauvais', 'Très mauvais'];
  return levels[aqi - 1] || 'Inconnu';
}

export default function AirQuality({ aqi }: AirProps) {
  return (
    <div className="text-white mt-4">
      <p>🌫️ Qualité de l’air : {getAQIDescription(aqi)} (AQI {aqi})</p>
    </div>
  );
}
