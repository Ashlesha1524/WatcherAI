import { useState, useEffect } from "react";

export default function Predict() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handlePredict = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setPrediction("");
    setConfidence(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setPrediction(data.prediction);
      setConfidence(data.confidence);
    } catch (err) {
      console.error(err);
      alert("Prediction failed.");
    }

    setLoading(false);
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    setPrediction("");
    setConfidence(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">

      <h1 className="text-5xl font-bold text-center mb-12">
        Flood Prediction
      </h1>

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-10">

          {/* Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">

            <div className="mb-6">

  <label
    htmlFor="imageUpload"
    className="inline-flex items-center gap-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
  >
    📁 Choose Image
  </label>

  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => setFile(e.target.files?.[0] || null)}
  />

  {file && (
    <p className="mt-3 text-gray-700 font-medium">
      ✅ {file.name}
    </p>
  )}

</div>

            <p className="text-gray-500">
              Upload a flood satellite or aerial image
            </p>

            {file && (
              <p className="mt-3 text-blue-600 font-semibold">
                {file.name}
              </p>
            )}

          </div>

          {/* Main Layout */}

          <div className="grid md:grid-cols-2 gap-10 mt-10">

            {/* LEFT */}

            <div>

              <h2 className="text-2xl font-bold mb-4">
                Uploaded Image
              </h2>

              {preview ? (

                <img
                  src={preview}
                  alt="Uploaded"
                  className="w-full h-[420px] object-cover rounded-xl shadow-lg border hover:scale-[1.02] transition duration-300"
                />

              ) : (

                <div className="w-full h-[420px] rounded-xl border-2 border-dashed flex items-center justify-center text-gray-400 text-xl">
                  No Image Selected
                </div>

              )}

            </div>

            {/* RIGHT */}

            <div>

              <h2 className="text-2xl font-bold mb-6">
                Prediction
              </h2>

              <button
                onClick={handlePredict}
                disabled={!file || loading}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg transition

                ${
                  !file
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Analyzing..." : "Predict Flood"}
              </button>

              <button
                onClick={clearImage}
                className="w-full mt-4 py-4 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
              >
                Clear
              </button>

              {prediction && (

                <div className="mt-8 rounded-xl shadow-lg p-8 bg-slate-50">

                  <h3 className="text-xl font-bold mb-6">
                    Detection Result
                  </h3>

                  <div
                    className={`text-4xl font-extrabold mb-4

                    ${
                      prediction === "FLOOD"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {prediction}
                  </div>

                  <div className="text-lg">
                    Confidence
                  </div>

                  <div className="text-3xl font-bold mt-2">
                    {confidence}%
                  </div>

                  <div className="mt-6 h-4 bg-gray-200 rounded-full overflow-hidden">

                    <div
                      className={`h-full

                      ${
                        prediction === "FLOOD"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${confidence}%`,
                      }}
                    />

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}