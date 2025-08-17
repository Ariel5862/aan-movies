// src/components/FeaturedMovie.jsx
import React from 'react';

const FeaturedMovie = ({ featured, onPlayClick, onInfoClick }) => {
  return (
    <div 
      className="relative bg-gray-800 h-[400px] rounded-lg flex items-end p-8 mb-10 text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(${featured.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="z-10 max-w-md">
        <h1 className="text-4xl font-bold mb-4">{featured.title}</h1>
        <p className="text-lg mb-6 opacity-90">{featured.description}</p>
        
        <div className="flex gap-4">
          <button 
            className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-opacity-80 transition-all duration-200 flex items-center gap-2"
            onClick={() => onPlayClick?.(featured)}
          >
            ▶ Play
          </button>
          
          <button 
            className="bg-gray-600 bg-opacity-70 text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2"
            onClick={() => onInfoClick?.(featured)}
          >
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;