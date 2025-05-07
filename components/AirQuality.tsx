import { getAirQualityText, getAirQualityColor } from '../lib/weatherUtils';
'use client';
interface Props {
  aqi: number;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

export default function PollutionCard({ aqi, components }: Props) {
  const qualityText = getAirQualityText(aqi);
  const qualityColor = getAirQualityColor(aqi);

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Qualité de l'air</h3>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-4xl font-bold" style={{ color: qualityColor }}>
          {aqi}
        </div>
        <div className="text-right">
          <div className="text-white font-medium">{qualityText}</div>
          <div className="text-sm text-white/70">Indice ATMO</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Pollutant name="PM2.5" value={components.pm2_5} unit="µg/m³" />
        <Pollutant name="PM10" value={components.pm10} unit="µg/m³" />
        <Pollutant name="NO₂" value={components.no2} unit="µg/m³" />
        <Pollutant name="O₃" value={components.o3} unit="µg/m³" />
        <Pollutant name="CO" value={components.co} unit="µg/m³" />
        <Pollutant name="SO₂" value={components.so2} unit="µg/m³" />
      </div>
    </div>
  );
}

function Pollutant({ name, value, unit }: { name: string, value: number, unit: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-3">
      <div className="text-sm text-white/70">{name}</div>
      <div className="text-white font-medium">
        {value.toFixed(2)} <span className="text-sm text-white/50">{unit}</span>
      </div>
    </div>
  );
}