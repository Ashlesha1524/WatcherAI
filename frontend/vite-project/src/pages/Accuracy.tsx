export default function Accuracy() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="min-h-screen bg-white/70 py-16 px-8">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-5xl font-bold text-center text-slate-800 mb-12">
            Model Accuracy Dashboard
          </h1>

          {/* Top Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center">
              <h2 className="text-gray-500 text-sm uppercase">
                Accuracy
              </h2>

              <p className="text-5xl font-bold text-blue-600 mt-4">
                94.82%
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center">
              <h2 className="text-gray-500 text-sm uppercase">
                Precision
              </h2>

              <p className="text-4xl font-bold text-green-600 mt-4">
                95%
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center">
              <h2 className="text-gray-500 text-sm uppercase">
                Recall
              </h2>

              <p className="text-4xl font-bold text-yellow-500 mt-4">
                94%
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center">
              <h2 className="text-gray-500 text-sm uppercase">
                F1 Score
              </h2>

              <p className="text-4xl font-bold text-purple-600 mt-4">
                94%
              </p>
            </div>

          </div>

          {/* Progress Bars */}

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 mb-10">

            <h2 className="text-3xl font-bold mb-8">
              Performance Metrics
            </h2>

            {[
              { name: "Accuracy", value: 95, color: "bg-blue-600" },
              { name: "Precision", value: 95, color: "bg-green-600" },
              { name: "Recall", value: 94, color: "bg-yellow-500" },
              { name: "F1 Score", value: 94, color: "bg-purple-600" },
            ].map((metric) => (
              <div key={metric.name} className="mb-6">

                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    {metric.name}
                  </span>

                  <span className="font-bold">
                    {metric.value}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`${metric.color} h-4 rounded-full`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>

              </div>
            ))}

          </div>

          {/* Bottom Cards */}

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">

              <h2 className="text-3xl font-bold mb-6">
                Model Information
              </h2>

              <div className="space-y-4 text-lg">

                <p>
                  <strong>Model:</strong> MobileNetV2
                </p>

                <p>
                  <strong>Framework:</strong> TensorFlow / Keras
                </p>

                <p>
                  <strong>Classes:</strong> Flood / No Flood
                </p>

                <p>
                  <strong>Input Size:</strong> 224 × 224
                </p>

                <p>
                  <strong>Optimizer:</strong> Adam
                </p>

                <p>
                  <strong>Loss Function:</strong> Binary Crossentropy
                </p>

              </div>

            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">

              <h2 className="text-3xl font-bold mb-6">
                Dataset Statistics
              </h2>

              <div className="space-y-4 text-lg">

                <p>
                  <strong>Training Images:</strong> 298
                </p>

                <p>
                  <strong>Validation Images:</strong> 90
                </p>

                <p>
                  <strong>Total Images:</strong> 388
                </p>

                <p>
                  <strong>Epochs:</strong> 10
                </p>

                <p>
                  <strong>Validation Accuracy:</strong> 94.82%
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-bold">
                    Model Ready
                  </span>
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}