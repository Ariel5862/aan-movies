import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./componenta/Navbar";
import DocoPage from "./pages/DocoPage";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import MyListPage from "./pages/myListPage";
import NetflixHomepage from "./components/NetflixHomepage";

function App() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<NetflixHomepage />} />
          <Route path="/doco" element={<DocoPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/mylist" element={<MyListPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
