import { useState } from "react";

export default function Landslide() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!city) return;

    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/landslide-risk/${city}`
      );

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch landslide risk");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="min-h-screen bg-white/70">
        <div className="max-w-4xl mx-auto py-16 px-8">
          <h1 className="text-5xl font-bold text-center mb-10 text-slate-800">
            Landslide Risk Assessment
          </h1>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <button
              onClick={handleCheck}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              {loading ? "Checking..." : "Check Risk"}
            </button>

            {result && (
              <div className="mt-8 border-t pt-6">
                <h2 className="text-2xl font-bold mb-4">Results</h2>

                <p>
                  <strong>City:</strong> {result.city}
                </p>

                <p>
                  <strong>Humidity:</strong> {result.humidity}%
                </p>

                <p>
                  <strong>Rainfall:</strong> {result.rainfall_mm} mm
                </p>

                <p
                  className={`mt-4 text-3xl font-bold ${
                    result.risk === "HIGH"
                      ? "text-red-600"
                      : result.risk === "MODERATE"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {result.risk} RISK
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}