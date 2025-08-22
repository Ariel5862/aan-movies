import { useEffect, useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-white/6 backdrop-blur-md border-neutral-800/20 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
      style={{ WebkitBackdropFilter: scrolled ? "blur(8px)" : undefined }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 relative">
        {/* לוגו */}
        <div className="text-2xl font-bold text-amber-400 mb-4 md:mb-0 md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2">
          AAN Movies
        </div>

        {/* קומפוננטות נפרדות */}
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </header>
  );
}

