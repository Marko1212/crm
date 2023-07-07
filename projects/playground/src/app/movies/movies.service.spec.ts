import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ApiMovie } from './types';
import {
  SpectatorHttp,
  SpectatorService,
  createHttpFactory,
  createServiceFactory,
} from '@ngneat/spectator';

const MOCK_POPULAR_RESPONSE = {
  results: [
    {
      title: 'Movie 1',
      overview: 'MOCK_OVERVIEW 1',
      vote_average: 10,
    } as ApiMovie,
    {
      title: 'Movie 2',
      overview: 'MOCK_OVERVIEW 2',
      vote_average: 7,
    } as ApiMovie,
  ],
};

describe('MoviesService avec TestBed', () => {
  it('should get transformed popular movies', (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    const service = new MoviesService(http);

    service.getPopularMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies[0].description).toBe('MOCK_OVERVIEW 1');
      expect(movies[0].rating).toBe(10);
      done();
    });

    const request = httpController.expectOne(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    );

    request.flush(MOCK_POPULAR_RESPONSE);
  });
});

describe('MoviesService avec Spectator', () => {
  let spectator: SpectatorHttp<MoviesService>;

  const createService = createHttpFactory({
    service: MoviesService,
  });

  it('should get transformed popular movies', (done: DoneFn) => {
    spectator = createService();

    /*     const http = spectator.inject(HttpClient);
    const httpController = spectator.inject(HttpTestingController); */

    spectator.service.getPopularMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies[0].description).toBe('MOCK_OVERVIEW 1');
      expect(movies[0].rating).toBe(10);
      done();
    });

    const request = spectator.controller.expectOne(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    );

    request.flush(MOCK_POPULAR_RESPONSE);
  });
});
