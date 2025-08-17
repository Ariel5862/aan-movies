import "./App.css";
import MovieCard from "./buttons";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-black p-4 rounded-lg">
      <MovieCard
      title="וידאו לבדיקה"
        videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
      />
    </div>
  </div>
  );
}

export default App;
