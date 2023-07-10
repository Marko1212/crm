import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MoviesKeyInterceptor } from './movies-key.interceptor';
import { SpectatorHttp, createHttpFactory } from '@ngneat/spectator';
import { Movie } from './types';

describe('MoviesKeyInterceptor avec TestBed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MoviesKeyInterceptor,
          multi: true,
        },
      ],
    });
  });
  it('should add key and language to request url', (done: DoneFn) => {
    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    http.get('https://api.themoviedb.org/3/movie/popular').subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    httpController
      .expectOne(
        'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR'
      )
      .flush({});
  });

  it('should use & as separator if needed', (done: DoneFn) => {
    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    http
      .get('https://api.themoviedb.org/3/movie/popular?page=1&toto=tata')
      .subscribe(() => {
        expect(true).toBe(true);
        done();
      });

    httpController
      .expectOne(
        'https://api.themoviedb.org/3/movie/popular?page=1&toto=tata&api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR'
      )
      .flush({});
  });
});

describe('MoviesKeyInterceptor avec Spectator', () => {
  let spectator: SpectatorHttp<MoviesKeyInterceptor>;

  const createSpectator = createHttpFactory({
    service: MoviesKeyInterceptor,
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MoviesKeyInterceptor,
        multi: true,
      },
    ],
  });
  it('should add key and language to request url', (done: DoneFn) => {
    spectator = createSpectator();

    spectator.httpClient.get('http://mon-url.com').subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    spectator.controller
      .expectOne(
        'http://mon-url.com?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR'
      )
      .flush({});
  });

  it('should use & as separator if needed', (done: DoneFn) => {
    spectator = createSpectator();

    spectator.httpClient.get('http://mon-url.com?param=toto').subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    spectator.controller
      .expectOne(
        'http://mon-url.com?param=toto&api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR'
      )
      .flush({});
  });
});
