import { Component, OnInit } from '@angular/core';
import { HttpApiMovies } from '../home/service/http-api_movies';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Films par genre</h1>
    @for (genre of genresWithMovies; track genre.id) {
    <section>
      <h2>{{ genre.name }}</h2>
      <ul class="movie-list">
        @for (movie of genre.movies; track movie.id) {
        <li>
          <img
            [src]="'https://media.themoviedb.org/t/p/w300' + movie.poster_path"
            [alt]="movie.title"
          />
          <h4>{{ movie.title }}</h4>
        </li>
        }
      </ul>
    </section>
    }
  `,
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  genresWithMovies: { id: number; name: string; movies: any[] }[] = [];

  constructor(private http: HttpApiMovies) {}

  ngOnInit(): void {
    this.http.fetchGenres().subscribe({
      next: (data) => {
        const genreRequests = data.genres.map((genre) =>
          this.http.fetchMoviesByGenre(genre.id).pipe(
            map((res) => ({
              id: genre.id,
              name: genre.name,
              movies: res.results.slice(0, 5),
            }))
          )
        );

        forkJoin(genreRequests).subscribe({
          next: (genresMovies) => {
            this.genresWithMovies = genresMovies;
            console.log('Films par genre :', this.genresWithMovies);
          },
          error: (err) => console.error(err),
        });
      },
      error: (err) => console.error('Erreur genres:', err),
    });
  }
}
