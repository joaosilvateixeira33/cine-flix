'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const maxPages = Math.min(totalPages, 500);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > maxPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-full flex items-center justify-center gap-2 sm:gap-4 mt-8 md:mt-10 pb-8 md:pb-12 px-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-lg bg-secondary border border-text-muted/20 text-text-main hover:border-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-medium text-text-muted text-center">
        <span>Página</span>
        <span className="font-bold text-text-main">
          {currentPage}
        </span>
        <span>de</span>
        <span className="font-bold text-text-main">
          {maxPages}
        </span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
        className="flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-lg bg-secondary border border-text-muted/20 text-text-main hover:border-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}