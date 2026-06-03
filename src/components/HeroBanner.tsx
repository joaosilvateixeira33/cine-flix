'use client';

import Image from "next/image";
import Link from "next/link";
import { Star, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchMovies } from "@/lib/tmdb";
import { useFavorites } from "@/context/FavoritesContext";

interface HeroBannerProps {
  type: string;
}

export default function HeroBanner({ type }: HeroBannerProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    async function loadBannerMovie() {
      try {
        const data = await fetchMovies(1, "", type);

        if (data?.results?.length) {
          const randomMovie =
            data.results[
              Math.floor(Math.random() * data.results.length)
            ];

          setMovie(randomMovie);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadBannerMovie();
  }, [type]);

  if (!movie) {
    return (
      <div className="mb-6 flex h-[220px] sm:h-[280px] md:h-[380px] w-full animate-pulse items-center justify-center rounded-2xl bg-secondary">
        <span className="text-sm text-text-muted">
          Carregando destaque...
        </span>
      </div>
    );
  }

  const favorited = isFavorite(movie.id);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(movie.id);
      return;
    }

    addFavorite({
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date:
        movie.release_date ||
        movie.first_air_date ||
        "",
    });
  };

  return (
    <div className="group relative mb-6 h-[220px] sm:h-[280px] md:h-[380px] overflow-hidden rounded-2xl">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title || movie.name}
        fill
        priority
        sizes="100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full items-end md:items-center">
        <div className="w-full max-w-2xl p-4 sm:p-6 md:p-10">
          <div className="mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 fill-star text-star" />
            <span className="text-sm font-semibold text-text-main">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>

          <h2 className="mb-3 line-clamp-2 text-xl font-bold text-text-main drop-shadow-lg sm:text-3xl md:text-5xl">
            {movie.title || movie.name}
          </h2>

          <p className="mb-5 hidden max-w-xl text-sm text-text-muted md:line-clamp-3 md:block">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/movie/${movie.id}`}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-accent/80 md:px-5"
            >
              Ver Mais
            </Link>

            <button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all md:px-5 ${
                favorited
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-white/20 bg-black/30 text-text-main hover:bg-black/50"
              }`}
            >
              {favorited ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <BookmarkPlus className="h-4 w-4" />
              )}

              <span className="hidden sm:inline">
                {favorited
                  ? "Remover da Lista"
                  : "Adicionar à Lista"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}