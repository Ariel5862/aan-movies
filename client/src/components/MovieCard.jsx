// src/components/MovieCard.jsx
import React from "react";
import ButtonCard from "./ButtonCard";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="min-w-[300px] h-[225px] rounded cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10 relative flex-shrink-0 overflow-hidden"
      onClick={() => onClick?.(movie)}
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className="w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 flex flex-col justify-end items-center bg-black/30 p-4 gap-2">
        <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
        <ButtonCard title={movie.title} videoSrc={movie.videoSrc} />
      </div>
    </div>
  );
};

export default MovieCard;
