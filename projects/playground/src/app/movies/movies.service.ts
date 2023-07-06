import { HttpClient } from '@angular/common/http';
import { ApiPopularResponse } from './types';
import { Injectable } from '@angular/core';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}
  getPopularMovies() {
    const request = this.http.get<ApiPopularResponse>(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    );

    return request;
  }
}
