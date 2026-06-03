import { fetchMovies } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

type MediaType = "movie" | "tv" | "all";

interface MovieGridProps {
  page: number;
  query: string;
  type: MediaType;
}

export default async function MovieGrid({
  page,
  query,
  type,
}: MovieGridProps) {
  const data = await fetchMovies(page, query, type);
  const movies = data.results || [];

  const displayMovies =
    page === 1 && !query ? movies.slice(1) : movies;

  if (!displayMovies.length) {
    return (
      <div className="w-full py-12 text-center text-sm text-text-muted md:text-base">
        Nenhum resultado encontrado.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {displayMovies.map((movie: any) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title || movie.name || "Sem título"}
          posterPath={movie.poster_path}
          voteAverage={movie.vote_average}
          releaseDate={
            movie.release_date ||
            movie.first_air_date ||
            ""
          }
        />
      ))}
    </div>
  );
}