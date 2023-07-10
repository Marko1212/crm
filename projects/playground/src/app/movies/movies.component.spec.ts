import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
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

    spectator.inject(MoviesService).getGenres.and.returnValue(of([]));

    spectator
      .inject(MoviesService)
      .getPopularMovies.and.returnValue(of(MOCK_MOVIES));

    spectator.detectChanges();

    expect(spectator.queryAll('.movie')).toHaveLength(2);
  });
});

describe('MoviesComponent avec TestBed', () => {
  let fixture: ComponentFixture<MoviesComponent>;
  let component: MoviesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    }).compileComponents();

    /*   const httpController = TestBed.inject(HttpTestingController); */

    const service = TestBed.inject(MoviesService);

    const spy = spyOn(service, 'getPopularMovies');
    spy.and.returnValue(of(MOCK_MOVIES));

    const genreSpy = spyOn(service, 'getGenres');
    genreSpy.and.returnValue(of([]));

    // Notre test
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load more movies if we are at the bottom of the page', async () => {
    component.isBottomOfThePage = () => true;

    window.dispatchEvent(new Event('scroll'));

    expect(component.movies.length).toBe(4);
  });

  it('should not load more movies if we are not at the bottom of the page', async () => {
    component.isBottomOfThePage = () => false;

    window.dispatchEvent(new Event('scroll'));

    expect(component.movies.length).toBe(2);
  });

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

    /*  expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    ); */

    // On s'assure que des films apparaissent
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);
  });
});
