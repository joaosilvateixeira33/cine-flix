'use client';

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Film,
  Tv,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function BarNavigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <nav
        className={`hidden md:flex sticky top-0 h-screen bg-secondary border-r border-accent flex-col justify-between transition-all duration-300 ${
          isCollapsed
            ? "w-[76px] px-4 py-6 items-center"
            : "w-[220px] p-6"
        }`}
      >
        <div className="flex flex-col gap-8 w-full">
          <div
            className={`text-2xl font-bold text-accent transition-all duration-300 ${
              isCollapsed ? "text-center" : ""
            }`}
          >
            {isCollapsed ? "CF" : "CineFlix"}
          </div>

          <div className="flex flex-col gap-4 w-full">
            <Link
              href="/"
              className={`flex items-center font-medium text-text-main hover:text-accent transition-colors ${
                isCollapsed ? "justify-center" : "gap-3"
              }`}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Home</span>}
            </Link>

            <Link
              href="/?type=movie"
              className={`flex items-center font-medium text-text-muted hover:text-accent transition-colors ${
                isCollapsed ? "justify-center" : "gap-3"
              }`}
            >
              <Film className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Filmes</span>}
            </Link>

            <Link
              href="/?type=tv"
              className={`flex items-center font-medium text-text-muted hover:text-accent transition-colors ${
                isCollapsed ? "justify-center" : "gap-3"
              }`}
            >
              <Tv className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Séries</span>}
            </Link>

            <Link
              href="/minha-lista"
              className={`flex items-center font-medium text-text-muted hover:text-accent transition-colors ${
                isCollapsed ? "justify-center" : "gap-3"
              }`}
            >
              <Bookmark className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Minha Lista</span>}
            </Link>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center text-text-muted hover:text-accent transition-colors font-medium ${
            isCollapsed ? "justify-center w-full" : "gap-3"
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Recolher</span>
            </>
          )}
        </button>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-around h-16 bg-secondary/95 backdrop-blur-xl border-t border-accent/20">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 text-text-main"
          >
            <Home className="w-5 h-5" />
            <span className="text-[11px]">Home</span>
          </Link>

          <Link
            href="/?type=movie"
            className="flex flex-col items-center justify-center gap-1 text-text-main"
          >
            <Film className="w-5 h-5" />
            <span className="text-[11px]">Filmes</span>
          </Link>

          <Link
            href="/?type=tv"
            className="flex flex-col items-center justify-center gap-1 text-text-main"
          >
            <Tv className="w-5 h-5" />
            <span className="text-[11px]">Séries</span>
          </Link>

          <Link
            href="/minha-lista"
            className="flex flex-col items-center justify-center gap-1 text-text-main"
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-[11px]">Lista</span>
          </Link>
        </div>
      </div>
    </>
  );
}