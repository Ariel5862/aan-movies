export default function IconButton({ children, className = "", ...props }) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center rounded-full p-2 text-neutral-200 hover:text-white bg-neutral-800/70 hover:bg-neutral-700/80 ring-1 ring-white/10 hover:ring-amber-400/40 shadow-lg shadow-black/20 transition-all duration-200 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 
