import "./App.css";
import Navbar from "./componenta/Navbar";
import DocoPage from "./pages/DocoPage";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";

function App() {
  return (
    <div>
      <Navbar />
      <DocoPage />
      <MoviesPage />
      <SeriesPage />
    </div>
  );
}

export default App;
