'use client';

import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteButtonProps {
  movie: {
    id: number;
    title: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
  };
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const favorited = isFavorite(movie.id);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite({
        id: movie.id,
        title: movie.title || movie.name || "Sem Título",
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date || movie.first_air_date || "",
      });
    }
  };

  return (
    <button 
      onClick={handleToggleFavorite}
      className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold transition-all shadow-md text-sm cursor-pointer border ${
        favorited 
          ? "bg-accent/20 border-accent text-accent hover:bg-accent/30" 
          : "bg-accent border-accent text-primary hover:bg-accent/90"
      }`}
    >
      {favorited ? <BookmarkCheck className="w-5 h-5 flex-shrink-0" /> : <BookmarkPlus className="w-5 h-5 flex-shrink-0" />}
      <span>{favorited ? "Salvo na sua Lista" : "Adicionar à Lista"}</span>
    </button>
  );
}