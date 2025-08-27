import React, { useEffect, useRef, useState } from "react";
import { IoPlayCircleSharp, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useMyList } from "./MyListContext";

export default function MovieModal({ movie, onClose }) {
  const videoRef = useRef(null);
  const { addToList, isInList, removeFromList } = useMyList();
  const [rating, setRating] = useState(0); // 0..5
  const saved = movie && isInList(movie.id);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const poster = movie.thumbnail || movie.backgroundImage;

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleToggleSave = () => {
    if (!movie) return;
    if (saved) removeFromList(movie.id);
    else addToList(movie);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="relative bg-neutral-900 text-white rounded-lg shadow-xl w-[95vw] max-w-4xl max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-neutral-300 hover:text-white text-xl"
          aria-label="Close"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-1">
            {poster && (
              <img
                src={poster}
                alt={movie.title}
                className="w-full h-auto rounded"
                draggable={false}
              />
            )}
          </div>
          <div className="md:col-span-2 space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>

            <div className="text-neutral-300 flex flex-wrap gap-4">
              {movie.year && <span>{movie.year}</span>}
              {movie.rating && <span>Rating: {movie.rating}</span>}
              {movie.id && <span>ID: {movie.id}</span>}
            </div>

            <p className="text-neutral-300">Enjoy your movie!</p>

            {movie.videoSrc && (
              <video
                ref={videoRef}
                className="w-full rounded mt-2"
                controls
                src={movie.videoSrc}
              />
            )}
          </div>
        </div>

        {/* Footer actions at the bottom */}
        <div className="sticky bottom-0 bg-neutral-900/95 backdrop-blur border-t border-white/10 px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-semibold hover:bg-opacity-90 transition"
            >
              <IoPlayCircleSharp size={20} />
              Play
            </button>

            <button
              onClick={handleToggleSave}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded transition"
            >
              {saved ? <IoRemoveCircleOutline size={20} /> : <IoAddCircleOutline size={20} />}
              {saved ? "Remove from List" : "Add to List"}
            </button>

            {/* Star rating */}
            <div className="ml-auto flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className="p-1 text-yellow-400 hover:scale-110 transition"
                  aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                >
                  {rating >= n ? <FaStar size={20} /> : <FaRegStar size={20} />}
                </button>
              ))}
              <span className="text-sm text-neutral-300 ml-2">{rating}/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}