import { Util } from './../service/util';
import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpApiMovies } from '../service/http-api_movies';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { Media } from '../home/home';
export interface MediaByIdType {
  type?: 'movie' | 'tv';
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

  constructor(private http: HttpApiMovies ,private util: Util) {}

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
            this.genresWithMovies = genresMovies.slice(0, 5);

            console.log('Films par genre :', this.genresWithMovies);
          },
          error: (err) => console.error('Erreur films par genre:', err),
        });
      },
      error: (err) => console.error('Erreur genres:', err),
    });
  }

 ngAfterViewInit() {
    this.util.setCarousels(this.carousels.toArray());
  }

  scrollLeft(index: number) {
    this.util.scrollLeft(index);
  }

  scrollRight(index: number) {
    this.util.scrollRight(index);
  }

  getMovieType(movie: MediaByIdType) {
    return this.util.getMovieType(movie as Media);
  }
}
