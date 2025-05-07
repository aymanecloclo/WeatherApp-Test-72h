'use client'

export default function WeatherCard({ data }: { data: any }) {
  // Vérification de l'existence de 'weather' dans 'data'
  if (!data?.weather) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
        <p>Impossible de récupérer les données météo.</p>
      </div>
    )
  }

  const temp = Math.round(data.weather.main.temp)
  const humidity = data.weather.main.humidity
  const windSpeed = data.weather.wind.speed

  // Vérification si 'weather' est un tableau et s'il a au moins un élément
  const description = data.weather.weather?.[0]?.description || 'Aucune description'

  return (
    <div className="group relative w-80">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-sky-500 to-indigo-500 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-sky-500/25">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M20%2016.2A4.5%204.5%200%200017.5%208h-1.8A7%207%200%104%2014.9%22%2F%3E%3Cpath%20d%3D%22M12%2012v9%22%2F%3E%3Cpath%20d%3D%22M8%2017l4%204%22%2F%3E%3Cpath%20d%3D%22M16%2017l-4%204%22%2F%3E%3C%2Fsvg%3E')] bg-center opacity-5"></div>
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{data.city}</h3>
              <p className="text-sm text-white/80">{data.city} Location</p>
            </div>
            <span className="text-sm text-white/80">4:30 PM</span>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-start">
              <span className="text-6xl font-bold text-white">{temp}°</span>
              <span className="mt-1 text-2xl text-white/80">C</span>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-white/20 blur-xl transition-opacity duration-300 group-hover:opacity-75"></div>
              <svg
                className="relative h-16 w-16 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                ></path>
              </svg>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-1">
              <svg
                className="h-6 w-6 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                ></path>
              </svg>
              <span className="text-sm font-medium text-white">Humidity</span>
              <span className="text-lg font-semibold text-white">{humidity}%</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <svg
                className="h-6 w-6 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                ></path>
              </svg>
              <span className="text-sm font-medium text-white">Wind</span>
              <span className="text-lg font-semibold text-white">{windSpeed} km/h</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <svg
                className="h-6 w-6 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 21v-2.25M5.636 18.364l1.591-1.591M3 12h2.25m.386-6.364L7.237 7.637"
                ></path>
              </svg>
              <span className="text-sm font-medium text-white">Description</span>
              <span className="text-lg font-semibold text-white">{description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
