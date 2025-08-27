// src/components/NetflixHomepage.jsx
import React, { useMemo, useState } from "react";
import { moviesData } from "../data/moviesData";
import FeaturedMovie from "./FeaturedMovie";
import MovieCarousel from "./MovieCarousel";
import MovieModal from "./MovieModal";

const NetflixHomepage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handlePlayClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleInfoClick = (movie) => {
    setSelectedMovie(movie);
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

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default NetflixHomepage;