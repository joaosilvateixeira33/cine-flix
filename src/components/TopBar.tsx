'use client';

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [text, setText] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setText(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (text.trim()) {
        if (params.get("search") !== text) {
          params.set("search", text);
          params.set("page", "1");
          router.push(`/?${params.toString()}`);
        }
      } else {
        if (params.has("search")) {
          params.delete("search");
          params.set("page", "1");
          router.push(`/?${params.toString()}`);
        }
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [text, router]);

  return (
    <header className="w-full mb-6 md:mb-8">
      <div className="relative w-full md:max-w-md lg:max-w-lg ml-auto">
        <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Buscar filmes, séries..."
          className="w-full h-11 md:h-12 bg-secondary text-text-main text-sm md:text-base rounded-full pl-10 md:pl-11 pr-10 md:pr-11 outline-none border border-transparent focus:border-accent transition-all placeholder:text-text-muted shadow-sm"
        />

        {text && (
          <button
            onClick={() => setText("")}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}