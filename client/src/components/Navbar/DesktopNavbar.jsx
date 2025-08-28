import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdHome,
  MdLocalMovies,
  MdLiveTv,
  MdArticle,
  MdPlaylistAdd,
  MdSearch,
  MdClose,
} from "react-icons/md";
import { moviesData } from "../../data/moviesData";
import IconButton from "../IconButton";

const btn =
  "px-5 py-2 rounded-full text-sm bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors";

export default function DesktopNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const allMovies = useMemo(() => {
    return moviesData.categories.flatMap((cat) =>
      cat.movies.map((m) => ({ ...m, categoryTitle: cat.title }))
    );
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allMovies
      .filter((m) => m.title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [allMovies, query]);

  return (
    <nav className="hidden md:flex items-center gap-4 md:mt-3 md:flex-row md:justify-evenly">
      <NavLink className={btn} to="/">
        <MdHome /> Home
      </NavLink>
      <NavLink className={btn} to="/movies">
        <MdLocalMovies />
        Movies
      </NavLink>
      <NavLink className={btn} to="/series">
        <MdLiveTv />
        Series
      </NavLink>
      <NavLink className={btn} to="/doco">
        <MdArticle />
        Doco
      </NavLink>
      <NavLink className={btn} to="/mylist">
        <MdPlaylistAdd />
        MyList
      </NavLink>

      <div className="relative ml-2 flex items-center gap-2">
        {!searchOpen && (
          <IconButton
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
          >
            <MdSearch size={18} />
          </IconButton>
        )}

        <div
          className={`overflow-hidden transition-[width,opacity] duration-300 ${
            searchOpen ? "opacity-100 w-64" : "opacity-0 w-0"
          }`}
        >
          <div className="flex items-center gap-2 bg-neutral-800/80 ring-1 ring-white/10 rounded-full px-3 py-1.5">
            <MdSearch className="text-amber-400" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-transparent outline-none text-sm text-neutral-100 placeholder:text-neutral-400 w-full"
            />
            <button
              aria-label="Close search"
              onClick={() => {
                setSearchOpen(false);
                setQuery("");
              }}
              className="text-neutral-300 hover:text-white"
            >
              <MdClose size={16} />
            </button>
          </div>

          {searchOpen && query && (
            <div className="absolute mt-2 w-[22rem] max-h-64 overflow-y-auto bg-neutral-900/95 ring-1 ring-white/10 rounded-xl shadow-xl p-2 z-10">
              {results.length === 0 ? (
                <div className="text-sm text-neutral-400 px-2 py-4">
                  No results
                </div>
              ) : (
                <ul className="grid grid-cols-2 gap-2">
                  {results.map((movie) => (
                    <li key={movie.id}>
                      <NavLink
                        to={`/movie/${movie.id}`}
                        state={{ movie }}
                        className="flex items-center gap-2 hover:bg-white/5 rounded p-1"
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                      >
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded"
                          loading="lazy"
                        />
                        <div className="leading-tight">
                          <div className="text-sm text-neutral-100 line-clamp-1">
                            {movie.title}
                          </div>
                          <div className="text-xs text-neutral-400">
                            {movie.year} • {movie.categoryTitle}
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
