'use client';

import Image from "next/image";
import Link from "next/link";
import { Star, Trash2 } from "lucide-react";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  releaseDate: string;
  onRemove?: () => void;
}

export default function MovieCard({
  id,
  title,
  posterPath,
  voteAverage,
  releaseDate,
  onRemove,
}: MovieCardProps) {
  const year = releaseDate ? releaseDate.split("-")[0] : "N/A";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-transparent bg-secondary/40 transition-all duration-300 hover:border-accent/20 hover:bg-secondary hover:shadow-lg hover:shadow-accent/5">
      {onRemove && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
          className="absolute top-2 right-2 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/80 text-text-main backdrop-blur-md transition-all hover:bg-red-600 hover:text-white md:opacity-0 md:group-hover:opacity-100"
          title="Remover dos favoritos"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}

      <Link href={`/movie/${id}`} className="flex h-full flex-col">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary">
          <Image
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w342${posterPath}`
                : "/placeholder-poster.png"
            }
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw,
                   (max-width: 768px) 33vw,
                   (max-width: 1024px) 25vw,
                   (max-width: 1280px) 20vw,
                   15vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-primary/80 px-2 py-1 text-xs font-bold text-text-main backdrop-blur-md">
            <Star className="h-3 w-3 fill-star text-star" />
            <span>{voteAverage.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-3">
          <h4 className="line-clamp-2 min-h-[40px] text-sm font-semibold text-text-main transition-colors group-hover:text-accent md:text-[15px]">
            {title}
          </h4>

          <span className="mt-2 text-xs font-medium text-text-muted">
            {year}
          </span>
        </div>
      </Link>
    </div>
  );
}