import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Plots() {
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
      name: "Kolkata",
      lat: 22.5726,
      lng: 88.3639,
      risk: "Low",
      color: "green",
    },
    {
      name: "Chennai",
      lat: 13.0827,
      lng: 80.2707,
      risk: "High",
      color: "red",
    },
    {
      name: "Bengaluru",
      lat: 12.9716,
      lng: 77.5946,
      risk: "Low",
      color: "green",
    },
    {
      name: "Hyderabad",
      lat: 17.385,
      lng: 78.4867,
      risk: "Medium",
      color: "orange",
    },
    {
      name: "Jaipur",
      lat: 26.9124,
      lng: 75.7873,
      risk: "Low",
      color: "green",
    },
    {
      name: "Patna",
      lat: 25.5941,
      lng: 85.1376,
      risk: "High",
      color: "red",
    },
    {
      name: "Guwahati",
      lat: 26.1445,
      lng: 91.7362,
      risk: "High",
      color: "red",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src="/background.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          Flood Risk Plots
        </h1>

        {/* Legend */}

        <div className="mb-6 flex gap-8 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg w-fit">

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
            <span className="text-black font-medium">
              Low Risk
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-black font-medium">
              Medium Risk
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span className="text-black font-medium">
              High Risk
            </span>
          </div>

        </div>

        {/* Map */}

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white/80 backdrop-blur-sm">

          <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            style={{
              height: "750px",
              width: "100%",
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((location, index) => (
              <CircleMarker
                key={index}
                center={[location.lat, location.lng]}
                radius={8}
                pathOptions={{
                  color: location.color,
                  fillColor: location.color,
                  fillOpacity: 0.9,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-black">
                    <strong>{location.name}</strong>
                    <br />
                    Risk Level: {location.risk}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

        </div>

      </div>

    </div>
  );
}