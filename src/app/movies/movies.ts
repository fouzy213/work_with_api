import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpApiMovies } from '../service/http-api_movies';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterLink } from "@angular/router";
export interface MediaByIdType {
  type?: "movie" | "tv";
}  
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Films par genre</h1>

    @for (genre of genresWithMovies; track genre.id) {
    <section class="genre-section">
      <h2>{{ genre.name }}</h2>

      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(genre.id)"></button>

        <div class="carousel" #carousel>
          <ul class="movie-list">
            @for (movie of genre.movies; track movie.id) {
            <li>
<a [routerLink]="['/', getMovieType(movie), movie.id]">
                  <img
                [src]="'https://media.themoviedb.org/t/p/w300' + movie.poster_path"
                [alt]="movie.title"
              />
</a>
              <h4>{{ movie.title }}</h4>
            </li>
            }
          </ul>
        </div>

        <button class="arrow right" (click)="scrollRight(genre.id)"></button>
      </div>
    </section>
    }
  `,
  styleUrls: ['./movies.scss'],
})
export class Movies implements OnInit {
  genresWithMovies: { id: number; name: string; movies: any[] }[] = [];

  @ViewChildren('carousel') carousels!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private http: HttpApiMovies) {}

  ngOnInit(): void {
    this.http.fetchGenres().subscribe({
      next: (data) => {
        const genreRequests = data.genres.map((genre) =>
          this.http.fetchMoviesByGenre(genre.id).pipe(
            map((res) => ({
              id: genre.id,
              name: genre.name,
              movies: res.results,
            }))
          )
        );

        forkJoin(genreRequests).subscribe({
          next: (genresMovies) => {
            this.genresWithMovies = genresMovies.slice(0,5);
            
            console.log('Films par genre :', this.genresWithMovies);
          },
          error: (err) => console.error('Erreur films par genre:', err),
        });
      },
      error: (err) => console.error('Erreur genres:', err),
    });
  }

  scrollLeft(genreId: number) {
    const carousel = this.getCarouselByGenreId(genreId);
    if (carousel) carousel.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(genreId: number) {
    const carousel = this.getCarouselByGenreId(genreId);
    if (carousel) carousel.scrollBy({ left: 300, behavior: 'smooth' });
  }

getMovieType(movie: any): 'movie' | 'tv' {
  return movie.type !== 'movie' ? 'movie' : 'tv';
  
}



  private getCarouselByGenreId(genreId: number): HTMLDivElement | null {
    const index = this.genresWithMovies.findIndex((movie) => movie.id === genreId);
    return this.carousels?.toArray()[index]?.nativeElement ?? null;
  }
}
