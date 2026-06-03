const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

if (!TOKEN) {
  console.error(
    "NEXT_PUBLIC_TMDB_API_TOKEN não foi encontrado no .env.local"
  );
}

async function tmdbFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("TMDB ERROR:", data);

    throw new Error(
      data.status_message ||
        `Erro TMDB (${response.status})`
    );
  }

  return data;
}

export async function fetchTrendingMovies(page: number = 1) {
  return tmdbFetch(
    `/trending/movie/day?language=pt-BR&page=${page}`
  );
}

export async function fetchMovies(
  page: number = 1,
  query: string = "",
  type: "movie" | "tv" | "all" = "movie"
) {
  const endpoint = query.trim()
    ? `/search/${type}?language=pt-BR&page=${page}&query=${encodeURIComponent(
        query
      )}`
    : `/trending/${type}/day?language=pt-BR&page=${page}`;

  return tmdbFetch(endpoint);
}

export async function fetchMovieDetails(movieId: string) {
  return tmdbFetch(
    `/movie/${movieId}?language=pt-BR`
  );
}

export async function fetchMovieCredits(movieId: string) {
  const data = await tmdbFetch(
    `/movie/${movieId}/credits?language=pt-BR`
  );

  return data.cast?.slice(0, 6) || [];
}

export async function fetchMovieRecommendations(
  movieId: string
) {
  const data = await tmdbFetch(
    `/movie/${movieId}/recommendations?language=pt-BR&page=1`
  );

  return data.results?.slice(0, 6) || [];
}

export async function fetchPopularMovies(
  page: number = 1
) {
  return tmdbFetch(
    `/movie/popular?language=pt-BR&page=${page}`
  );
}

export async function fetchTopRatedMovies(
  page: number = 1
) {
  return tmdbFetch(
    `/movie/top_rated?language=pt-BR&page=${page}`
  );
}

export async function fetchUpcomingMovies(
  page: number = 1
) {
  return tmdbFetch(
    `/movie/upcoming?language=pt-BR&page=${page}`
  );
}

export async function fetchNowPlayingMovies(
  page: number = 1
) {
  return tmdbFetch(
    `/movie/now_playing?language=pt-BR&page=${page}`
  );
}