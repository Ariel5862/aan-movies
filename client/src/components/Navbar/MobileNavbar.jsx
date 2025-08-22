import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdHome, MdLocalMovies, MdLiveTv, MdArticle, MdPlaylistAdd, MdMenu, MdClose } from "react-icons/md";

const btn =
  "px-5 py-2 rounded-full text-sm bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors";

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      {/* כפתור המבורגר */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(v => !v)}
      >
        {menuOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
      </button>

      {/* תפריט שנפתח עם אנימציה */}
      <div
        className={`mt-4 grid gap-3 transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <NavLink className={btn} to="/" onClick={() => setMenuOpen(false)}><MdHome /> Home</NavLink>
        <NavLink className={btn} to="/movies" onClick={() => setMenuOpen(false)}><MdLocalMovies /> Movies</NavLink>
        <NavLink className={btn} to="/series" onClick={() => setMenuOpen(false)}><MdLiveTv /> Series</NavLink>
        <NavLink className={btn} to="/doco" onClick={() => setMenuOpen(false)}><MdArticle /> Doco</NavLink>
        <NavLink className={btn} to="/mylist" onClick={() => setMenuOpen(false)}><MdPlaylistAdd /> MyList</NavLink>
      </div>
    </div>
  );
}
