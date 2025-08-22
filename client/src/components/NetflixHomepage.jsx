// src/components/NetflixHomepage.jsx
import React, { useMemo } from "react";
import { moviesData } from "../data/moviesData";
import FeaturedMovie from "./FeaturedMovie";
import MovieCarousel from "./MovieCarousel";

const NetflixHomepage = () => {
  const handleMovieClick = (movie) => {
    console.log("Movie clicked:", movie);
    // כאן תוכל להוסיף נווט למודל או לעמוד חדש
  };

  const handlePlayClick = (movie) => {
    console.log("Play clicked:", movie);
    // כאן תוכל להוסיף לוגיקה לניגון הסרט
  };

  const handleInfoClick = (movie) => {
    console.log("Info clicked:", movie);
    // כאן תוכל להוסיף מודל עם פרטים נוספים
  };

  const rotatingFeatured = useMemo(() => {
    const list = [];
    if (moviesData?.featured) list.push(moviesData.featured);
    moviesData?.categories?.forEach((category) => {
      category?.movies?.forEach((m) => {
        list.push({
          title: m.title,
          backgroundImage: m.thumbnail,
        });
      });
    });
    return list;
  }, []);

  return (
    <div>
      {/* Featured Movie */}
      <FeaturedMovie
        featured={moviesData.featured}
        featuredList={rotatingFeatured}
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
