import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  MdHome,
  MdLocalMovies,
  MdLiveTv,
  MdArticle,
  MdPlaylistAdd,
  MdMenu,
  MdClose,
  MdSearch,
} from "react-icons/md";
import IconButton from "../IconButton";
import { moviesData } from "../../data/moviesData";

// פונקציה לקבלת class של NavLink עם תמיכה במצב פעיל
const getNavLinkClass = (isActive) =>
  `px-5 py-2 rounded-full text-sm transition-colors flex items-center gap-2 ${
    isActive
      ? "bg-amber-400 text-black"
      : "bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black"
  }`;

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  // refs לניהול הפוקוס
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // מערך כל הסרטים - ממואיזד עם בדיקות בטיחות
  const allMovies = useMemo(() => {
    if (!moviesData?.categories) return [];
    return moviesData.categories.flatMap((cat) =>
      cat.movies?.map((m) => ({ ...m, categoryTitle: cat.title })) || []
    );
  }, []);

  // תוצאות החיפוש - ממואיזד עם בדיקות בטיחות
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allMovies
      .filter((m) => m.title?.toLowerCase().includes(q))
      .slice(0, 6);
  }, [allMovies, query]);

  // פונקציות callback ממואיזות לביצועים טובים יותר
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
    if (searchOpen) setSearchOpen(false);
  }, [searchOpen]);

  const toggleSearch = useCallback(() => {
    setSearchOpen(prev => {
      const newState = !prev;
      if (newState && menuOpen) setMenuOpen(false);
      return newState;
    });
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  
  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, []);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, []);

  // פוקוס אוטומטי על שדה החיפוש
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // סגירת תפריטים בלחיצה על Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (menuOpen || searchOpen) {
          closeAll();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, searchOpen, closeAll]);

  // סגירת תפריטים בלחיצה מחוץ לאזור
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        // בדוק אם הקליק לא היה על כפתור התפריט
        const menuButton = e.target.closest('[aria-controls="mobile-menu"]');
        if (!menuButton) {
          setMenuOpen(false);
        }
      }
      
      if (searchOpen && searchRef.current && !searchRef.current.contains(e.target)) {
        // בדוק אם הקליק לא היה על כפתור החיפוש
        const searchButton = e.target.closest('[aria-label*="search"]');
        if (!searchButton) {
          closeSearch();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, searchOpen, closeSearch]);

  return (
    <div className="md:hidden relative">
      {/* כפתור חיפוש */}
      <div className="absolute right-16 top-1/2 -translate-y-12">
        <IconButton
          aria-label={searchOpen ? "Close search" : "Open search"}
          aria-expanded={searchOpen}
          onClick={toggleSearch}
          className={`p-2 transition-colors ${
            searchOpen ? "text-amber-400" : ""
          }`}
        >
          <MdSearch size={22} />
        </IconButton>
      </div>

      {/* כפתור תפריט */}
      <div className="absolute right-4 top-1/2 -translate-y-12 z-50">
        <button
          className="p-2 rounded-full bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          {menuOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
        </button>
      </div>

      {/* תפריט נפתח מעל הזרימה */}
      <nav
        ref={menuRef}
        id="mobile-menu"
        className={`absolute left-4 right-4 top-16 bg-neutral-900/95 rounded-xl shadow-xl p-4 grid gap-3 transition-all duration-300 overflow-hidden z-40 ${
          menuOpen
            ? "max-h-96 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
        aria-hidden={!menuOpen}
      >
        <NavLink
          className={({ isActive }) => getNavLinkClass(isActive)}
          to="/"
          onClick={closeMenu}
        >
          <MdHome size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => getNavLinkClass(isActive)}
          to="/movies"
          onClick={closeMenu}
        >
          <MdLocalMovies size={18} />
          <span>Movies</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => getNavLinkClass(isActive)}
          to="/series"
          onClick={closeMenu}
        >
          <MdLiveTv size={18} />
          <span>Series</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => getNavLinkClass(isActive)}
          to="/doco"
          onClick={closeMenu}
        >
          <MdArticle size={18} />
          <span>Doco</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => getNavLinkClass(isActive)}
          to="/mylist"
          onClick={closeMenu}
        >
          <MdPlaylistAdd size={18} />
          <span>MyList</span>
        </NavLink>
      </nav>

      {/* חלון חיפוש */}
      {searchOpen && (
        <div
          ref={searchRef}
          className="absolute left-4 right-4 mt-14 bg-neutral-900/95 ring-1 ring-white/10 rounded-xl shadow-xl p-3 z-40"
          role="search"
          aria-label="Movie search"
        >
          <div className="flex items-center gap-2 bg-neutral-800/80 ring-1 ring-white/10 rounded-full px-3 py-1.5">
            <MdSearch className="text-amber-400 flex-shrink-0" size={16} />
            <input
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-transparent outline-none text-sm text-neutral-100 placeholder:text-neutral-400 w-full"
              aria-label="Search for movies"
            />
            <button
              aria-label="Clear search and close"
              onClick={closeSearch}
              className="text-neutral-300 hover:text-white flex-shrink-0 p-1 -m-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-white/30"
            >
              <MdClose size={16} />
            </button>
          </div>

          {query && (
            <div className="mt-2 max-h-64 overflow-y-auto">
              {results.length === 0 ? (
                <div 
                  className="text-sm text-neutral-400 px-2 py-4 text-center"
                  role="status"
                  aria-live="polite"
                >
                  No results found for "{query}"
                </div>
              ) : (
                <ul className="grid grid-cols-2 gap-2" role="list">
                  {results.map((movie) => (
                    <li key={movie.id} role="listitem">
                      <NavLink
                        to={`/movie/${movie.id}`}
                        state={{ movie }}
                        className="flex items-center gap-2 hover:bg-white/5 rounded p-1 transition-colors focus:outline-none focus:bg-white/10"
                        onClick={closeAll}
                        aria-label={`View ${movie.title} from ${movie.year}`}
                      >
                        <img
                          src={movie.thumbnail}
                          alt=""
                          className="w-10 h-14 object-cover rounded flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="leading-tight min-w-0 flex-1">
                          <div className="text-sm text-neutral-100 line-clamp-1 font-medium">
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