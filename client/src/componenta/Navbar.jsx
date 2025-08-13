// client/src/componenta/Navbar.jsx
function Navbar({ onNavigate = () => {} }) {
    const btn =
      "px-5 py-2 rounded-full text-sm bg-neutral-800 text-neutral-200 hover:bg-amber-400 hover:text-black transition-colors";
  
    return (
      <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-2xl font-bold text-amber-400 text-center">AAN Movies</div>
  
          <nav className="mt-3 flex items-center justify-evenly">
            <button className={btn} onClick={() => onNavigate("doco")}>Doco</button>
            <button className={btn} onClick={() => onNavigate("movies")}>Movies</button>
            <button className={btn} onClick={() => onNavigate("series")}>Series</button>
          </nav>
        </div>
      </header>
    );
  }
  
  export default Navbar;