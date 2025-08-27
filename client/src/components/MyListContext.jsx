import { createContext, useContext, useEffect, useMemo, useState } from "react";

const MyListContext = createContext(undefined);

export function MyListProvider({ children }) {
  const [myList, setMyList] = useState(() => {
    try {
      const raw = localStorage.getItem("myList");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("myList", JSON.stringify(myList));
    } catch {}
  }, [myList]);

  const addToList = (movie) => {
    if (!movie?.id) return;
    setMyList((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromList = (movieId) => {
    setMyList((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInList = (movieId) => myList.some((m) => m.id === movieId);

  const value = useMemo(
    () => ({ myList, addToList, removeFromList, isInList }),
    [myList]
  );

  return (
    <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
  );
}

export function useMyList() {
  const ctx = useContext(MyListContext);
  if (!ctx) throw new Error("useMyList must be used within MyListProvider");
  return ctx;
}
