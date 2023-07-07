import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPopularResponse, Movie, Movies } from './types';
import { MoviesService } from './movies.service';
import { Observable } from 'rxjs';

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
  movies: Movies = [];

  constructor(private service: MoviesService) {}

  ngOnInit(): void {
    /*     const request = fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    ); */
    this.service
      .getPopularMovies()
      .subscribe((movies) => (this.movies = movies));
    /*     request
      .then((response) => response.json())
      .then((result: any) => {
        console.log('La requête est arrivée');
        this.movies = result.results;
      });

    console.log('La requête est partie'); */
  }
}
