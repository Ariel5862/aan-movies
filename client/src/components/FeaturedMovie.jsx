// src/components/FeaturedMovie.jsx
import React, { useEffect, useMemo, useState } from "react";

const ROTATE_INTERVAL_MS = 10000; // 10 seconds

const FeaturedMovie = ({
  featured,
  featuredList,
  onPlayClick,
  onInfoClick,
  fit = "cover",
}) => {
  const items = useMemo(() => {
    if (Array.isArray(featuredList) && featuredList.length > 0)
      return featuredList;
    return featured ? [featured] : [];
  }, [featured, featuredList]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return; // no rotation needed
    const timerId = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timerId);
  }, [items.length]);

  useEffect(() => {
    // reset index when items change
    setIndex(0);
  }, [items]);

  const current = items.length > 0 ? items[index] : featured;
  const backgroundImage =
    current?.backgroundImage ||
    current?.thumbnail ||
    featured?.backgroundImage ||
    "";
  const title = current?.title || featured?.title || "";
  const description = current?.description || featured?.description || "";

  return (
    <div
      className="relative bg-gray-800 h-[60vh] md:h-[70vh] rounded-lg flex items-end p-8 mb-10 text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(${backgroundImage})`,
        backgroundSize: fit === "contain" ? "contain" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#111827",
      }}
    >
      <div className="z-10 max-w-md">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-lg mb-6 opacity-90">{description}</p>
        )}

        <div className="flex gap-4">
          <button
            className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-opacity-80 transition-all duration-200 flex items-center gap-2"
            onClick={() => onPlayClick?.(current)}
          >
            ▶ Play
          </button>

          <button
            className="bg-gray-600 bg-opacity-70 text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2"
            onClick={() => onInfoClick?.(current)}
          >
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
