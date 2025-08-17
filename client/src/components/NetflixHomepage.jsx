// src/components/NetflixHomepage.jsx
import React from 'react';
import { moviesData } from '../data/moviesData';
import FeaturedMovie from './FeaturedMovie';
import MovieCarousel from './MovieCarousel';

const NetflixHomepage = () => {
  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie);
    // כאן תוכל להוסיף נווט למודל או לעמוד חדש
  };

  const handlePlayClick = (movie) => {
    console.log('Play clicked:', movie);
    // כאן תוכל להוסיף לוגיקה לניגון הסרט
  };

  const handleInfoClick = (movie) => {
    console.log('Info clicked:', movie);
    // כאן תוכל להוסיף מודל עם פרטים נוספים
  };

  return (
    <div className="min-h-screen bg-gray-900 p-5">
      {/* Featured Movie */}
      <FeaturedMovie 
        featured={moviesData.featured}
        onPlayClick={handlePlayClick}
        onInfoClick={handleInfoClick}
      />

      {/* Movie Categories */}
      {moviesData.categories.map((category) => (
        <MovieCarousel 
          key={category.id}
          category={category}
          onMovieClick={handleMovieClick}
        />
      ))}
    </div>
  );
};

export default NetflixHomepage;