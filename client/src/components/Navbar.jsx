import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MdHome,
  MdLocalMovies,
  MdLiveTv,
  MdArticle,
  MdPlaylistAdd,
} from "react-icons/md";
function Navbar() {
  const btn =
    "px-5 py-2 rounded-full text-sm bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "bg-white/6 backdrop-blur-md border-neutral-800/20 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
        style={{ WebkitBackdropFilter: scrolled ? "blur(8px)" : undefined }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* לוגו */}
          <div className="text-2xl font-bold text-amber-400 mb-4 md:mb-0 md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2">
            AAN Movies
          </div>

          {/* תפריט ניווט */}
          <nav className="flex flex-col items-center gap-4 md:mt-3 md:flex-row md:justify-evenly">
            <NavLink className={btn} to="/">
              <span className="inline-flex items-center gap-2">
                <MdHome /> <span>Home</span>
              </span>
            </NavLink>
            <NavLink className={btn} to="/movies">
              <span className="inline-flex items-center gap-2">
                <MdLocalMovies /> <span>Movies</span>
              </span>
            </NavLink>
            <NavLink className={btn} to="/series">
              <span className="inline-flex items-center gap-2">
                <MdLiveTv /> <span>Series</span>
              </span>
            </NavLink>
            <NavLink className={btn} to="/doco">
              <span className="inline-flex items-center gap-2">
                <MdArticle /> <span>Doco</span>
              </span>
            </NavLink>
            <NavLink className={btn} to="/mylist">
              <span className="inline-flex items-center gap-2">
                <MdPlaylistAdd /> <span>MyList</span>
              </span>
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="pt-20"></main>
    </>
  );
}

export default Navbar;
