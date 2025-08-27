import { useLocation, useParams, Link } from "react-router-dom";
import { moviesData } from "../data/moviesData";

function findMovieById(movieId) {
  for (const category of moviesData.categories || []) {
    const m = category.movies.find((x) => x.id === movieId);
    if (m) return m;
  }
  return null;
}

export default function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();
  const movie = location.state?.movie || findMovieById(id);

  if (!movie) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Movie not found</h2>
        <Link to="/mylist" className="text-amber-400 underline">
          Back to My List
        </Link>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="md:col-span-1">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-auto rounded"
          draggable={false}
        />
      </div>
      <div className="md:col-span-2 space-y-3 text-white">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <div className="text-neutral-300 space-x-4">
          {movie.year && <span>{movie.year}</span>}
          {movie.rating && <span>Rating: {movie.rating}</span>}
          <span>ID: {movie.id}</span>
        </div>
        <p className="text-neutral-300">Enjoy your movie!</p>
        <div>
          <Link to="/mylist" className="text-amber-400 underline">
            Back to My List
          </Link>
        </div>
      </div>
    </section>
  );
}
