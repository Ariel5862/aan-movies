import { useMyList } from "../components/MyListContext";
import { useNavigate } from "react-router-dom";

export default function MyListPage() {
  const { myList, removeFromList } = useMyList();
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">הרשימה שלי</h2>
      {myList.length === 0 ? (
        <p className="text-neutral-300">כאן יוצגו הפריטים שלי.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {myList.map((movie) => (
            <div
              key={movie.id}
              className="relative cursor-pointer"
              onClick={() =>
                navigate(`/movie/${movie.id}`, { state: { movie } })
              }
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-[225px] object-cover rounded"
                draggable={false}
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-white text-sm font-medium truncate">
                  {movie.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromList(movie.id);
                  }}
                  className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
