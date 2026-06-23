
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">WatcherAI</h1>

      <div className="flex gap-8">
        <Link to="/">Home</Link>
        <Link to="/plots">Plots</Link>
        <Link to="/heatmaps">Heatmaps</Link>
        <Link to="/satellite">Satellite</Link>
        <Link to="/accuracy">Accuracy</Link>
        <Link to="/predict">Predict</Link>
        <Link to="/landslide">Landslide</Link>
      </div>
    </nav>
  );
}