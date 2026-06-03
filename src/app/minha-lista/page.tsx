'use client';

import BarNavigation from "@/components/BarNavigation";
import MovieCard from "@/components/MovieCard";
import { useFavorites } from "@/context/FavoritesContext";
import { BookmarkX } from "lucide-react";

export default function MinhaListaPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-primary">
      <BarNavigation />

      <main className="flex-1 overflow-y-auto bg-primary standard-scrollbar">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 md:px-8">
          <header className="border-b border-secondary pb-4">
            <h1 className="text-2xl font-bold text-text-main md:text-3xl">
              Minha Lista de Favoritos
            </h1>

            {favorites.length > 0 && (
              <p className="mt-2 text-sm text-text-muted">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "título salvo"
                  : "títulos salvos"}
              </p>
            )}
          </header>

          {favorites.length === 0 ? (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
              <BookmarkX className="h-14 w-14 text-secondary-hover" />

              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-text-main">
                  Sua lista está vazia
                </h2>

                <p className="max-w-md text-sm text-text-muted">
                  Adicione filmes e séries aos favoritos para encontrá-los
                  rapidamente aqui.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  voteAverage={movie.vote_average}
                  releaseDate={movie.release_date}
                  onRemove={() => removeFavorite(movie.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}