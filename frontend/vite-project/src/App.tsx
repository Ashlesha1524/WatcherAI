import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Plots from "./pages/Plots";
import Heatmaps from "./pages/Heatmaps";
import Satellite from "./pages/Satellite";
import Accuracy from "./pages/Accuracy";
import Predict from "./pages/Predict";
import Landslide from "./pages/Landslide";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Prevent content from hiding behind fixed navbar */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plots" element={<Plots />} />
          <Route path="/heatmaps" element={<Heatmaps />} />
          <Route path="/satellite" element={<Satellite />} />
          <Route path="/accuracy" element={<Accuracy />} />
          <Route path="/predict" element={<Predict />} />

          <Route path="/landslide" element={<Landslide />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;