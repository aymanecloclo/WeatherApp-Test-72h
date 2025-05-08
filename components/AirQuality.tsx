'use client';
import { FaLeaf, FaSmog, FaWind, FaFire } from 'react-icons/fa';
import { GiChemicalDrop } from 'react-icons/gi';

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

const getAirQualityText = (aqi: number) => {
  if (aqi <= 1) return 'Excellent';
  if (aqi <= 2) return 'Bon';
  if (aqi <= 3) return 'Modéré';
  if (aqi <= 4) return 'Médiocre';
  return 'Mauvais';
};

const getAirQualityColor = (aqi: number) => {
  const colors = [
    'text-emerald-400', // 1
    'text-green-400',   // 2
    'text-yellow-400',  // 3
    'text-orange-400',  // 4
    'text-red-400'      // 5
  ];
  return colors[Math.min(aqi - 1, 4)];
};

const getPollutantIcon = (name: string) => {
  switch(name) {
    case 'PM2.5':
    case 'PM10':
      return <FaSmog className="text-blue-300" />;
    case 'NO₂':
      return <FaWind className="text-purple-300" />;
    case 'O₃':
      return <FaLeaf className="text-green-300" />;
    case 'CO':
      return <FaFire className="text-red-300" />;
    case 'SO₂':
      return <GiChemicalDrop className="text-yellow-300" />;
    default:
      return <FaSmog className="text-gray-300" />;
  }
};

export default function AirQuality({ aqi, components }: Props) {
  const qualityText = getAirQualityText(aqi);
  const qualityColor = getAirQualityColor(aqi);
  const qualityLevel = Math.min(Math.max(aqi, 1), 5);

  return (
    <div className=" md:mt-12 w-6/12 bg-gradient-to-b from-sky-500 to-indigo-500 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-sky-500/25 backdrop-blur-lg rounded-2xl p-6 ">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <FaLeaf className="text-emerald-400" />
          Qualité de l'air
        </h3>
        <div className="text-sm text-white/70">Indice ATMO</div>
      </div>

      {/* AQI Indicator */}
      <div className="relative mb-8">
        <div className="flex justify-between text-xs text-white/70 mb-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <span key={level}>{level}</span>
          ))}
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${qualityColor.replace('text', 'bg')}`}
            style={{ width: `${(qualityLevel / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="text-5xl font-bold" style={{ color: getAirQualityColor(aqi) }}>
          {aqi}
        </div>
        <div className="text-right">
          <div className={`text-xl font-medium ${qualityColor} mb-1`}>{qualityText}</div>
          <div className="text-sm text-white/70">Niveau de pollution</div>
        </div>
      </div>

      {/* Polluants */}
      <div className="grid grid-cols-2 gap-3">
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
    <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 flex items-start gap-3">
      <div className="p-2 rounded-lg bg-white/10">
        {getPollutantIcon(name)}
      </div>
      <div>
        <div className="text-sm text-white/70">{name}</div>
        <div className="text-white font-medium">
          {value.toFixed(2)} <span className="text-xs text-white/50">{unit}</span>
        </div>
      </div>
    </div>
  );
}