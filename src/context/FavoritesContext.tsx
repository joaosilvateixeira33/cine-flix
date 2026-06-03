'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipagem do filme que vamos guardar na lista
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Carrega os favoritos do localStorage ao montar o componente no navegador
  useEffect(() => {
    const stored = localStorage.getItem("@cineflix:favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Adiciona um filme à lista
  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === movie.id)) return prev; // Evita duplicados
      const updated = [...prev, movie];
      localStorage.setItem("@cineflix:favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("@cineflix:favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook personalizado para usar o contexto facilmente
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
  }
  return context;
}