import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdHome,
  MdLocalMovies,
  MdLiveTv,
  MdArticle,
  MdPlaylistAdd,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { MdSearch } from "react-icons/md";
import IconButton from "../IconButton";
import { moviesData } from "../../data/moviesData";

const btn =
  "px-5 py-2 rounded-full text-sm bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors";

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      .slice(0, 6);
  }, [allMovies, query]);

  return (
    <div className="md:hidden relative">
      <div className="absolute right-16 top-1/2 -translate-y-12">
        <IconButton
          aria-label="Open search"
          onClick={() => setSearchOpen((v) => !v)}
          className="p-2"
        >
          <MdSearch size={22} />
        </IconButton>
      </div>
      <button
        className="absolute right-4 top-1/2 -translate-y-12 p-2 rounded-full bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
      </button>

      <div
        className={`mt-4 grid gap-3 transition-all duration-300 ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <NavLink className={btn} to="/" onClick={() => setMenuOpen(false)}>
          <MdHome /> Home
        </NavLink>
        <NavLink
          className={btn}
          to="/movies"
          onClick={() => setMenuOpen(false)}
        >
          <MdLocalMovies /> Movies
        </NavLink>
        <NavLink
          className={btn}
          to="/series"
          onClick={() => setMenuOpen(false)}
        >
          <MdLiveTv /> Series
        </NavLink>
        <NavLink className={btn} to="/doco" onClick={() => setMenuOpen(false)}>
          <MdArticle /> Doco
        </NavLink>
        <NavLink
          className={btn}
          to="/mylist"
          onClick={() => setMenuOpen(false)}
        >
          <MdPlaylistAdd /> MyList
        </NavLink>
      </div>

      {searchOpen && (
        <div className="absolute left-4 right-4 mt-14 bg-neutral-900/95 ring-1 ring-white/10 rounded-xl shadow-xl p-3 z-40">
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

          {query && (
            <div className="mt-2 max-h-64 overflow-y-auto">
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
                          setMenuOpen(false);
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
      )}
    </div>
  );
}
