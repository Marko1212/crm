import { HttpClient } from '@angular/common/http';
import { ApiPopularResponse, Movie } from './types';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}
  getPopularMovies() {
    return this.http
      .get<ApiPopularResponse>(
        'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
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
            } as Movie;
          });
        })
      );
  }
}
