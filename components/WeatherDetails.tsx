'use client';
interface WeatherDetailsProps {
  data: {
    temp: number;
    humidity: number;
    wind_speed: number;
    pressure:number;
  },
  wind:number;
}

export default function WeatherDetails({ data,wind }: WeatherDetailsProps) {
  return (
<div className={`grid grid-cols-3 gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm `}>
      <div className="flex flex-col items-center">
        <span className="text-sm text-white/80">Humidity</span>
        <span className="text-xl font-semibold text-white">{data.humidity}%</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-white/80">Wind</span>
        <span className="text-xl font-semibold text-white">{wind} km/h</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-white/80">Pressure</span>
        <span className="text-xl font-semibold text-white">{data.pressure} hPa</span>
      </div>
    </div>
  );
}
