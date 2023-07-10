export type Movie = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
};

export type Movies = Movie[];

export type ApiPopularResponse = {
  /**
   * La page sur laquelle on se trouve actuellement
   */
  page: number;
  /**
   * La liste des films
   */
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
};

export type ApiMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ApiGenresResponse = {
  genres: Genres;
};

export type Genre = {
  id: number;
  name: string;
};

export type Genres = Genre[];
