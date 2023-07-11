import { HttpClient } from '@angular/common/http';
import { ApiGenresResponse, ApiPopularResponse, Movie } from './types';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}
  getPopularMovies(page = 1) {
    return this.http
      .get<ApiPopularResponse>(
        'https://api.themoviedb.org/3/movie/popular?page=' + page
      )
      .pipe(
        map((response) => {
          return response.results.map((item) => {
            return {
              id: item.id,
              title: item.title,
              description: item.overview,
              rating: item.vote_average,
              image: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
              genres: item.genre_ids,
            } as Movie;
          });
        })
      );
  }

  getGenres() {
    return this.http
      .get<ApiGenresResponse>('https://api.themoviedb.org/3/genre/movie/list')
      .pipe(map((apiResponse) => apiResponse.genres));
  }
}
