import { useRef, useState } from "react";

export const useCarousel = () => {
  const rowRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);

  const move = (direction) => {
    if (!rowRef.current || isMoving) return;

    setIsMoving(true);
    const container = rowRef.current;
    const scrollAmount = 300; // Adjust this value to control scroll distance

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }

    // Reset moving state after animation
    setTimeout(() => setIsMoving(false), 300);
  };

  return { rowRef, move, isMoving };
};
