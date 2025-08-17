// src/hooks/useCarousel.js
import { useRef, useState, useCallback } from 'react';

export const useCarousel = () => {
  const [isMoving, setIsMoving] = useState(false);
  const rowRef = useRef(null);

  const move = useCallback((direction) => {
    if (isMoving || !rowRef.current) return;
    
    setIsMoving(true);
    const row = rowRef.current;
    const cardWidth = 160; // רוחב קארד + גאפ
    
    if (direction === 'right') {
      row.style.transition = 'transform 350ms ease';
      row.style.transform = `translateX(-${cardWidth}px)`;
      
      setTimeout(() => {
        row.style.transition = 'none';
        row.appendChild(row.firstElementChild);
        row.style.transform = 'translateX(0)';
        setIsMoving(false);
      }, 350);
    } else {
      row.style.transition = 'none';
      row.insertBefore(row.lastElementChild, row.firstElementChild);
      row.style.transform = `translateX(-${cardWidth}px)`;
      
      setTimeout(() => {
        row.style.transition = 'transform 350ms ease';
        row.style.transform = 'translateX(0)';
        setTimeout(() => setIsMoving(false), 350);
      }, 10);
    }
  }, [isMoving]);

  return { rowRef, move, isMoving };
};