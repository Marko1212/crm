import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { of } from 'rxjs';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

const MOCK_MOVIES = [
  {
    title: 'Movie 1',
    id: 1,
    description: '',
    rating: 10,
    image: '',
  },
  {
    title: 'Movie 2',
    id: 2,
    description: '',
    rating: 10,
    image: '',
  },
];

describe('MoviesComponent avec Spectator', () => {
  let spectator: Spectator<MoviesComponent>;

  const createSpectator = createComponentFactory({
    component: MoviesComponent,
    imports: [HttpClientTestingModule],
    mocks: [MoviesService],
  });

  it('should show movies', () => {
    spectator = createSpectator({
      detectChanges: false,
    });
    //  const service = spectator.inject(MoviesService);

    // const spy = spyOn(service, 'getPopularMovies');
    spectator
      .inject(MoviesService)
      .getPopularMovies.and.returnValue(of(MOCK_MOVIES));

    spectator.detectChanges();

    expect(spectator.queryAll('.movie')).toHaveLength(2);
  });
});

describe('MoviesComponent avec TestBed', () => {
  it('should show movies', async () => {
    /* const fetchSpy = spyOn(window, 'fetch');
    fetchSpy.and.returnValue(
      Promise.resolve({
        json() {
          return Promise.resolve({
            results: [{ title: 'Movie 1' }, { title: 'Movie 2' }],
          });
        },
      } as Response)
    ); */
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    }).compileComponents();

    /*   const httpController = TestBed.inject(HttpTestingController); */

    const service = TestBed.inject(MoviesService);

    const spy = spyOn(service, 'getPopularMovies');
    spy.and.returnValue(of(MOCK_MOVIES));

    // Notre test
    const fixture = TestBed.createComponent(MoviesComponent);
    fixture.detectChanges();
    /* 
    const request = httpController.expectOne(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    );

    request.flush({
      results: [
        {
          title: 'Movie 1',
        },
        {
          title: 'Movie 2',
        },
      ],
    }); */

    fixture.detectChanges();

    /*  expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    ); */

    // On s'assure que des films apparaissent
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);
  });
});
