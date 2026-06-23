import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

function HeatLayer() {
  const map = useMap();

  useEffect(() => {
    const heatPoints: [number, number, number][] = [
      [19.076, 72.8777, 1.0], // Mumbai
      [28.6139, 77.2090, 0.8], // Delhi
      [22.5726, 88.3639, 1.0], // Kolkata
      [13.0827, 80.2707, 0.9], // Chennai
      [26.8467, 80.9462, 0.7], // Lucknow
      [25.5941, 85.1376, 1.0], // Patna
      [26.1445, 91.7362, 1.0], // Guwahati
      [17.3850, 78.4867, 0.6], // Hyderabad
      [12.9716, 77.5946, 0.5], // Bangalore
      [26.9124, 75.7873, 0.4], // Jaipur

      // extra points for dense heatmap
      [20.5937, 78.9629, 0.9],
      [21.1458, 79.0882, 0.8],
      [23.2599, 77.4126, 0.7],
      [24.5854, 73.7125, 0.8],
      [22.7196, 75.8577, 0.9],
      [18.5204, 73.8567, 0.7],
      [15.2993, 74.1240, 0.6],
      [11.0168, 76.9558, 0.8],
      [9.9312, 76.2673, 1.0],
      [8.5241, 76.9366, 0.9],
    ];

    const heatLayer = (L as any).heatLayer(heatPoints, {
      radius: 35,
      blur: 25,
      maxZoom: 10,
      minOpacity: 0.4,
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map]);

  return null;
}

export default function Heatmaps() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="rounded-xl overflow-hidden shadow-lg border relative">

          <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            style={{
              height: "800px",
              width: "100%",
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <HeatLayer />
          </MapContainer>

          {/* Legend */}
          <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-4 z-[1000]">
            <h3 className="font-semibold mb-3 text-black">
              Risk Intensity
            </h3>

            <div className="flex gap-3">
              <div className="w-6 h-48 rounded bg-gradient-to-t from-blue-500 via-yellow-400 to-red-600"></div>

              <div className="flex flex-col justify-between text-sm text-black">
                <span>High</span>
                <span>Medium</span>
                <span>Low</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}