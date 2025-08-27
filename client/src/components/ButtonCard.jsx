// src/components/ButtonCard.jsx
import {
  IoPlayCircleSharp,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
} from "react-icons/io5";
import { BiLike, BiDislike } from "react-icons/bi";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { useState, useRef } from "react";
import { useMyList } from "./MyListContext";

function ButtonCard({ title, videoSrc, movie }) {
  const [showLikeOptions, setShowLikeOptions] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const { addToList, isInList, removeFromList } = useMyList();

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const saved = movie && isInList(movie.id);

  return (
    <div className="relative w-[300px] h-[170px] rounded-lg overflow-hidden group cursor-pointer">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* כפתור קול */}
      <div className="absolute top-2 right-2 z-20 pointer-events-auto">
        <button
          onClick={toggleMute}
          className="bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
        >
          {muted ? <MdVolumeOff size={20} /> : <MdVolumeUp size={20} />}
        </button>
      </div>

      {/* כפתורים שמופיעים על hover */}
      <div className="absolute inset-0 bg-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white pointer-events-none">
        <h3 className="text-lg font-semibold mb-2 pointer-events-auto">
          {title}
        </h3>
        <div className="flex gap-3 pointer-events-auto">
          <button className="bg-white/20 hover:bg-white/50 text-white rounded-full p-2 transition">
            <IoPlayCircleSharp />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!movie) return;
              if (saved) {
                removeFromList(movie.id);
              } else {
                addToList(movie);
              }
            }}
            className="bg-white/20 hover:bg-white/50 text-white rounded-full p-2 transition"
            title={saved ? "Remove from My List" : "Add to My List"}
          >
            {saved ? <IoRemoveCircleOutline /> : <IoAddCircleOutline />}
          </button>
          <div
            className="relative"
            onMouseEnter={() => setShowLikeOptions(true)}
            onMouseLeave={() => setShowLikeOptions(false)}
          >
            <button className="bg-white/20 hover:bg-white/50 text-white rounded-full p-2 transition">
              <BiLike />
            </button>
            {showLikeOptions && (
              <div className="absolute top-full right-0 mt-2 bg-black text-white rounded shadow-lg p-2 z-10 w-32 text-sm">
                <button className="flex items-center gap-2 hover:bg-white/20 w-full px-2 py-1 rounded">
                  <BiLike /> אהבתי
                </button>
                <button className="flex items-center gap-2 hover:bg-white/20 w-full px-2 py-1 rounded">
                  <BiDislike /> לא אהבתי
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonCard;
