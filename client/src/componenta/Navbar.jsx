import { NavLink } from "react-router-dom";

function Navbar() {
  const btn = "px-5 py-2 rounded-full text-sm bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors";

  return (
    <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-2xl font-bold text-amber-400 text-center">AAN Movies</div>

        <nav className="mt-3 flex items-center justify-evenly">
          <NavLink className={btn} to="/doco">Doco</NavLink>
          <NavLink className={btn} to="/movies">Movies</NavLink>
          <NavLink className={btn} to="/series">Series</NavLink>
          <NavLink className={btn} to="/mylist">MyList</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;