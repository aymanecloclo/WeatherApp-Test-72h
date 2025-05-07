'use client';
interface WeatherDetailsProps {
  data: {
    temp: number;
    humidity: number;
    wind_speed: number;
  };
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  return (
    <div className="text-white mt-4 space-y-2">
      <p>🌡️ Température : {data.temp}°C</p>
      <p>💧 Humidité : {data.humidity}%</p>
      <p>🌬️ Vent : {data.wind_speed} km/h</p>
    </div>
  );
}
