// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div 
      className="min-w-[300px] h-[225px] bg-gray-800 rounded cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10 relative group flex-shrink-0"
      onClick={() => onClick?.(movie)}
    >
      <img 
        src={movie.thumbnail} 
        alt={movie.title}
        className="w-full h-full object-cover rounded"
        draggable={false}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="text-center text-white p-2">
          <h3 className="font-semibold text-sm mb-1">{movie.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
