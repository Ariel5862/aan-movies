// src/components/MovieCarousel.jsx
import React from "react";
import { useCarousel } from "../hooks/useCarousel";
import MovieCard from "./MovieCard";

const MovieCarousel = ({ category, onMovieClick }) => {
  const { rowRef, move, isMoving } = useCarousel();

  return (
    <div className="mb-10 relative">
      <h2 className="mb-4 text-xl font-semibold text-white">
        {category.title}
      </h2>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 -translate-y-1/2 left-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white text-xl p-2 rounded-full z-10 transition-all duration-200 disabled:opacity-30"
        onClick={() => move("left")}
        disabled={isMoving}
      >
        ←
      </button>

      <button
        className="absolute top-1/2 -translate-y-1/2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white text-xl p-2 rounded-full z-10 transition-all duration-200 disabled:opacity-30"
        onClick={() => move("right")}
        disabled={isMoving}
      >
        →
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          ref={rowRef}
          className="flex gap-2.5"
          style={{ transform: "translateX(0)" }}
        >
          {category.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;
