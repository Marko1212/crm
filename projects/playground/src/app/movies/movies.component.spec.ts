import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('MoviesComponent', () => {
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
    }).compileComponents();

    const httpController = TestBed.inject(HttpTestingController);

    // Notre test
    const fixture = TestBed.createComponent(MoviesComponent);
    fixture.detectChanges();

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
    });

    fixture.detectChanges();

    /*  expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular?api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR&page=1'
    ); */

    // On s'assure que des films apparaissent
    expect(
      fixture.nativeElement.querySelectorAll('.movie').length
    ).toBeGreaterThan(0);
  });
});
