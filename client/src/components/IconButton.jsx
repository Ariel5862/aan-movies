export default function IconButton({ children }) {
  return (
    <button className="bg-white/20 hover:bg-white/50 text-white rounded-full p-2 transition">
      {children}
    </button>
  );
}
