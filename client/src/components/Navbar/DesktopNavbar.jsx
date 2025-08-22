import { NavLink } from "react-router-dom";
import { MdHome, MdLocalMovies, MdLiveTv, MdArticle, MdPlaylistAdd } from "react-icons/md";

const btn =
  "px-5 py-2 rounded-full text-sm bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors";

export default function DesktopNavbar() {
  return (
    <nav className="hidden md:flex items-center gap-4 md:mt-3 md:flex-row md:justify-evenly">
      <NavLink className={btn} to="/"><MdHome /> Home</NavLink>
      <NavLink className={btn} to="/movies"><MdLocalMovies /> Movies</NavLink>
      <NavLink className={btn} to="/series"><MdLiveTv /> Series</NavLink>
      <NavLink className={btn} to="/doco"><MdArticle /> Doco</NavLink>
      <NavLink className={btn} to="/mylist"><MdPlaylistAdd /> MyList</NavLink>
    </nav>
  );
}
