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
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Sun & Moon</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/80">Sunrise</span>
          <span className="text-white font-medium">{formatTime(sunrise)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80">Sunset</span>
          <span className="text-white font-medium">{formatTime(sunset)}</span>
        </div>
      </div>
    </div>
  );
}
