import { useState } from "react";

export default function Predict() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setPrediction(data.prediction);
      setConfidence(data.confidence);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto py-16 px-8">

        <h1 className="text-5xl font-bold text-center mb-10">
          Flood Prediction
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-10">

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
            className="mb-6 block"
          />

          <button
            onClick={handlePredict}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          {prediction && (
            <div className="mt-10 p-6 rounded-xl bg-slate-100">

              <h2 className="text-3xl font-bold mb-4">
                Result
              </h2>

              <p className="text-2xl font-semibold">
                {prediction}
              </p>

              <p className="text-lg mt-2">
                Confidence: {confidence}%
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}