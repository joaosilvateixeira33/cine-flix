import { fetchMovies } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  page: number;
  query: string;
  type: string;
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
      <div className="w-full py-12 text-center text-text-muted text-sm md:text-base">
        Nenhum resultado encontrado.
      </div>
    );
  }

  return (
    <div className="grid w-full gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
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