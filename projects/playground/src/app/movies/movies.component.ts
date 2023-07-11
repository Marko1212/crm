import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPopularResponse, Genres, Movie, Movies } from './types';
import { MoviesService } from './movies.service';
import {
  Observable,
  Subscription,
  combineLatest,
  distinctUntilChanged,
  filter,
  forkJoin,
  fromEvent,
  map,
  merge,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-movies',
  template: `
    <div *ngIf="genresAndMovies$ | async as data">
      <div class="mb-5">
        <span class="badge bg-light" *ngFor="let genre of data.genres">
          {{ genre.name }}
        </span>
      </div>
      <div class="row movies">
        <div class="movie col-4 mb-2" *ngFor="let movie of data.movies">
          <div class="card">
            <img src="{{ movie.image }}" alt="" class="card-image-top" />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.description }}</p>
              <span class="badge bg-light" *ngFor="let id of movie.genres"
                >{{ getGenreLabel(id) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MoviesComponent implements OnInit {
  movies: Movies = [];
  genres: Genres = [];

  genresAndMovies$?: Observable<{ genres: Genres; movies: Movies }>;

  /*   genres$?: Observable<Genres>;
  movies$?: Observable<Movies>; */

  page = 1;

  getGenreLabel(id: number) {
    return this.genres.find((genre) => genre.id === id)?.name;
  }

  //  subscriptions: Subscription[] = [];

  /*   scrollSubscription?: Subscription;
  initSubscription?: Subscription; */

  constructor(private service: MoviesService) {}

  ngOnInit(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      map(() => this.isBottomOfThePage()),
      distinctUntilChanged(),
      filter((isBottom) => isBottom === true),
      tap(() => this.page++),
      switchMap(() => this.service.getPopularMovies(this.page))
    );

    /*     this.genres$ = this.service
      .getGenres()
      .pipe(tap((genres) => (this.genres = genres)));
    this.movies$ = this.service.getPopularMovies(); */
    this.genresAndMovies$ = combineLatest([
      this.service.getGenres(),
      merge(this.service.getPopularMovies(this.page), scroll$),
    ]).pipe(
      tap(([genres, movies]) => {
        this.genres = genres;
        this.movies = [...this.movies, ...movies];
      }),
      map(([genres, movies]) => {
        return { genres, movies: this.movies };
      })
    );

    // this.subscriptions.push(initSub, scrollSub);

    /*     window.addEventListener('scroll', () => {
      const isBottom =
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 300;

      if (!isBottom) {
        enBas = false;
        return;
      }

      if (enBas === true) {
        return;
      }

      enBas = true;

      this.page++;

      this.service.getPopularMovies(this.page).subscribe((movies) => {
        this.movies = [...this.movies, ...movies];
      });
    }); */
    /*  this.service.getGenres().subscribe((genres) => (this.genres = genres)); */
    /*     const request = fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    ); */
    /* this.service
      .getPopularMovies()
      .subscribe((movies) => (this.movies = movies)); */
    /*     request
      .then((response) => response.json())
      .then((result: any) => {
        console.log('La requête est arrivée');
        this.movies = result.results;
      });

    console.log('La requête est partie'); */
  }

  isBottomOfThePage() {
    const isBottom =
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 300;
    return isBottom;
  }

  ngOnDestroy() {
    /*     this.initSubscription?.unsubscribe();
    this.scrollSubscription?.unsubscribe(); */
    //  this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
