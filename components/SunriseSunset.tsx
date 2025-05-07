'use client';
interface Props {
  sunrise: number;
  sunset: number;
}

function formatTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function SunriseSunset({ sunrise, sunset }: Props) {
  return (
    <div className="text-white mt-4">
      <p>🌅 Lever du soleil : {formatTime(sunrise)}</p>
      <p>🌇 Coucher du soleil : {formatTime(sunset)}</p>
    </div>
  );
}
