import { useEffect, useMemo, useRef, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import { moviesData } from "../data/moviesData";
import IconButton from "./IconButton";

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(id);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const allMovies = useMemo(() => {
    return moviesData.categories.flatMap((cat) =>
      cat.movies.map((m) => ({
        ...m,
        categoryId: cat.id,
        categoryTitle: cat.title,
      }))
    );
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allMovies.filter((m) => m.title.toLowerCase().includes(q));
  }, [allMovies, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-x-0 top-10 mx-auto max-w-3xl px-4">
        <div className="rounded-2xl bg-neutral-900/80 ring-1 ring-white/10 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3">
            <MdSearch className="text-amber-400" size={20} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full bg-transparent outline-none text-neutral-100 placeholder:text-neutral-400 py-1"
            />
            <IconButton aria-label="Close search" onClick={onClose}>
              <MdClose size={18} />
            </IconButton>
          </div>

          <div className="max-h-[60vh] overflow-y-auto border-t border-white/5">
            {query && results.length === 0 && (
              <div className="px-6 py-8 text-center text-neutral-400">
                No results for "{query}"
              </div>
            )}

            {results.length > 0 && (
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {results.map((movie) => (
                  <li key={movie.id} className="group">
                    <div className="aspect-[2/3] w-full overflow-hidden rounded-lg ring-1 ring-white/10 shadow-md">
                      <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2 text-sm text-neutral-100 line-clamp-1">
                      {movie.title}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {movie.year} • {movie.categoryTitle}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
