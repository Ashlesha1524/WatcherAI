
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21')",
        }}
      >
        <div className="min-h-screen bg-white/70">
          <div className="max-w-7xl mx-auto px-8 py-20 flex items-center justify-between">

            <div className="max-w-xl">
              <h1 className="text-7xl font-bold text-slate-800 mb-6">
                WatcherAI:
              </h1>

              <h2 className="text-4xl font-semibold text-slate-700 mb-6">
                Flood and Landslide Prediction System
              </h2>

              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                Advanced Flood and Landslide Prediction System using
                Machine Learning, Weather Forecasting and Real-Time Risk Analysis.
              </p>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800"
                alt="Flood"
                className="w-[550px] rounded-xl shadow-xl"
              />
            </div>

          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
                alt="Flood"
                className="rounded-lg shadow-lg w-full max-w-lg"
              />
            </div>

            <div>
              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                About WatcherAI
              </h2>

              <p className="text-2xl italic text-gray-500 mb-8">
                A web application designed to assist users and governments
                in preparing for and responding to flood and landslide events.
              </p>

              <p className="text-gray-600 text-lg leading-8 mb-8">
                Floods and landslides are among the most devastating natural
                disasters worldwide, causing significant damage to lives,
                infrastructure, and the environment.
              </p>

              <p className="text-gray-600 text-lg leading-8 mb-8">
                By leveraging Machine Learning, weather forecasting,
                hydrological analysis, and terrain-based risk assessment,
                WatcherAI provides early predictions and actionable insights.
              </p>

              <p className="text-gray-600 text-lg leading-8">
                The platform helps communities, emergency responders,
                and authorities make informed decisions before disasters
                occur, reducing risk and improving preparedness.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}