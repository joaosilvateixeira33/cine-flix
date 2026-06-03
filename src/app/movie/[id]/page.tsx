import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Film,
  Users,
  Layers,
} from "lucide-react";

import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieRecommendations,
} from "@/lib/tmdb";

import MovieCard from "@/components/MovieCard";
import FavoriteButton from "@/components/FavoriteButton";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const [movie, cast, recommendations] =
    await Promise.all([
      fetchMovieDetails(id),
      fetchMovieCredits(id),
      fetchMovieRecommendations(id),
    ]);

  const hours = Math.floor((movie.runtime || 0) / 60);
  const minutes = (movie.runtime || 0) % 60;

  const durationFormatted =
    hours > 0
      ? `${hours}h ${minutes}m`
      : `${minutes}m`;

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-primary text-text-main standard-scrollbar">
      {movie.backdrop_path && (
        <div className="absolute inset-x-0 top-0 h-[35vh] sm:h-[45vh] md:h-[60vh] opacity-20 blur-md pointer-events-none">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </Link>

        <section className="flex flex-col gap-8 border-b border-secondary/30 pb-10 md:flex-row md:gap-12">
          <div className="relative mx-auto w-[180px] sm:w-[220px] md:w-[280px] aspect-[2/3] overflow-hidden rounded-2xl border border-secondary bg-secondary shadow-2xl md:mx-0">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder-poster.png"
              }
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 text-center md:text-left">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="italic text-accent text-sm md:text-base">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <div className="flex items-center gap-2 rounded-lg border border-text-muted/10 bg-secondary/80 px-3 py-2">
                <Star className="w-4 h-4 fill-star text-star" />
                <span className="font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-text-muted/10 bg-secondary/80 px-3 py-2">
                <Clock className="w-4 h-4" />
                <span>{durationFormatted}</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-text-muted/10 bg-secondary/80 px-3 py-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {movie.genres?.map((genre: any) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-text-muted/20 bg-secondary px-3 py-1 text-xs font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex justify-center md:justify-start">
              <FavoriteButton movie={movie} />
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <h2 className="flex items-center justify-center gap-2 text-lg font-bold md:justify-start">
                <Film className="w-4 h-4 text-accent" />
                Sinopse
              </h2>

              <p className="max-w-3xl text-sm leading-relaxed text-text-muted md:text-base">
                {movie.overview ||
                  "Nenhuma sinopse disponível para este filme."}
              </p>
            </div>
          </div>
        </section>

        {cast?.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 flex items-center gap-2 border-b border-secondary/30 pb-2 text-xl font-bold">
              <Users className="w-5 h-5 text-accent" />
              Elenco Principal
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {cast.map((actor: any) => (
                <div
                  key={actor.id}
                  className="rounded-xl border border-text-muted/10 bg-secondary/30 p-3 text-center transition-colors hover:border-text-muted/30"
                >
                  <div className="relative mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full bg-secondary">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/placeholder-avatar.png"
                      }
                      alt={actor.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="line-clamp-1 text-xs font-semibold">
                    {actor.name}
                  </p>

                  <p className="line-clamp-1 text-[11px] text-text-muted">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {recommendations?.length > 0 && (
          <section className="mt-10 pb-12">
            <h2 className="mb-5 flex items-center gap-2 border-b border-secondary/30 pb-2 text-xl font-bold">
              <Layers className="w-5 h-5 text-accent" />
              Títulos Semelhantes
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {recommendations.map((rec: any) => (
                <MovieCard
                  key={rec.id}
                  id={rec.id}
                  title={rec.title || rec.name}
                  posterPath={rec.poster_path}
                  voteAverage={rec.vote_average}
                  releaseDate={
                    rec.release_date ||
                    rec.first_air_date ||
                    ""
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}