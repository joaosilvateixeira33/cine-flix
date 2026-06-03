import HeroBanner from "./HeroBanner";
import MovieGrid from "./MovieGrid";
import TopBar from "./TopBar";
import Pagination from "./Pagination";

interface MainProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    type?: string;
  }>;
}

export default async function Main({
  searchParams,
}: MainProps) {
  const params = await searchParams;

  const currentPage = Math.max(
    Number(params?.page || "1"),
    1
  );

  const searchQuery = params?.search || "";
  const currentType = params?.type || "movie";

  const sectionTitle =
    currentType === "tv"
      ? "Séries em Alta"
      : "Filmes em Alta";

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-primary standard-scrollbar">
      <div className="sticky top-0 z-50 border-b border-secondary/50 bg-primary/80 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-3 sm:px-6">
          <TopBar />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-4 sm:px-6 md:gap-8">
        {!searchQuery && currentPage === 1 && (
          <div className="w-full">
            <HeroBanner type={currentType} />
          </div>
        )}

        <section className="flex flex-col gap-4 pb-8 md:pb-12">
          <div className="flex items-center justify-between gap-3 border-b border-secondary pb-3">
            <h2 className="text-lg font-bold text-text-main sm:text-xl md:text-2xl">
              {searchQuery
                ? `Resultados para: ${searchQuery}`
                : sectionTitle}
            </h2>

            {!searchQuery && (
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-text-muted">
                {currentType === "tv"
                  ? "Séries"
                  : "Filmes"}
              </span>
            )}
          </div>

          <MovieGrid
            key={`${currentPage}-${searchQuery}-${currentType}`}
            page={currentPage}
            query={searchQuery}
            type={currentType}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={500}
          />
        </section>
      </div>
    </main>
  );
}