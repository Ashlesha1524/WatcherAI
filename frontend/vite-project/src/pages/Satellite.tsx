import { useState } from "react";

export default function Satellite() {
  const [city, setCity] = useState("Delhi");
  const [month, setMonth] = useState("July");

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-8 py-12">

        <h1 className="text-5xl font-bold text-center text-slate-800 mb-12">
          Satellite Image Analysis
        </h1>

        <div className="flex justify-center gap-4 mb-12">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Lucknow</option>
            <option>Kolkata</option>
            <option>Chennai</option>
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option>January</option>
            <option>April</option>
            <option>July</option>
            <option>October</option>
          </select>

          <button className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-md">
            Go
          </button>
        </div>

        <h2 className="text-3xl text-center text-slate-700 mb-8">
          {city} in {month} 2024
        </h2>

        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border">

          <img
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600"
            alt="Satellite Analysis"
            className="w-full h-[650px] object-cover"
          />

          <div className="absolute top-0 right-0 h-full bg-white/95 w-24 flex flex-col items-center justify-center">
            
            <span className="text-red-600 font-bold mb-4">
              High
            </span>

            <div className="h-96 w-7 rounded-full bg-gradient-to-b from-red-600 via-yellow-400 to-blue-600"></div>

            <span className="text-blue-600 font-bold mt-4">
              Low
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}