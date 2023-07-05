import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPopularResponse } from './types';

@Component({
  selector: 'app-movies',
  template: `
    <div class="row movies">
      <div class="movie col-4 mb-2" *ngFor="let movie of movies">
        <div class="card">
          <img src="{{ movie.image }}" alt="" class="card-image-top" />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    /*     const request = fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    ); */

    const request = this.http.get<ApiPopularResponse>(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    );

    request.subscribe((response) => {
      this.movies = response.results.map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.overview,
          rating: item.vote_average,
          image: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
        };
      });
    });

    /*     request
      .then((response) => response.json())
      .then((result: any) => {
        console.log('La requête est arrivée');
        this.movies = result.results;
      });

    console.log('La requête est partie'); */
  }
}
