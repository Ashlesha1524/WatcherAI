import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const cityCoords: Record<string, [number, number]> = {
  delhi: [28.6139, 77.209],
  mumbai: [19.076, 72.8777],
  lucknow: [26.8467, 80.9462],
  chennai: [13.0827, 80.2707],
  patna: [25.5941, 85.1376],
};
const locations = [
  {
    name: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    risk: "High",
    color: "red",
  },
  {
    name: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    risk: "Low",
    color: "green",
  },
  {
    name: "Lucknow",
    lat: 26.8467,
    lng: 80.9462,
    risk: "Medium",
    color: "orange",
  },
  {
    name: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    risk: "High",
    color: "red",
  },
  {
    name: "Patna",
    lat: 25.5941,
    lng: 85.1376,
    risk: "High",
    color: "red",
  },
];

import { useEffect } from "react";

function FlyToCity({ city }: { city: string }) {
  const map = useMap();

  useEffect(() => {
    const coords = cityCoords[city.toLowerCase()];

    if (coords) {
      map.flyTo(coords, 9, {
        duration: 2,
      });
    }
  }, [city, map]);

  return null;
}
export default function Satellite() {
  const [search, setSearch] = useState("");

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="min-h-screen bg-white/70 py-12 px-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold text-center mb-3">
            🛰 Live Satellite Monitoring
          </h1>

          <p className="text-center text-slate-600 mb-8">
            Real-time visualization of flood-prone regions.
          </p>

          {/* SEARCH BAR */}
          <div className="flex justify-center gap-3 mb-8">
            <input
              type="text"
              placeholder="Search city (Delhi, Mumbai...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-96 px-5 py-3 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md"
            >
              🔍 Search
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/90">

            <MapContainer
              center={[22.5937, 78.9629]}
              zoom={5}
              style={{ height: "700px", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />

              <FlyToCity city={search} />

              {locations.map((l, i) => (
                <CircleMarker
                  key={i}
                  center={[l.lat, l.lng]}
                  radius={8}
                  pathOptions={{
                    color: l.color,
                    fillColor: l.color,
                    fillOpacity: 1,
                  }}
                >
                  <Popup>
                    <strong>{l.name}</strong>
                    <br />
                    Risk: {l.risk}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>

            <div className="absolute top-5 right-5 bg-white rounded-xl shadow-xl p-4 z-[1000]">
              <h3 className="font-bold mb-2">Legend</h3>
              <div>🔴 High</div>
              <div>🟠 Medium</div>
              <div>🟢 Low</div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}