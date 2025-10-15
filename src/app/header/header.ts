import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpApiHomePage } from '../service/http-api-homePage';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <h1>Film du moment</h1>

    @if (randomMovie) {
    <div class="single_movie">
      <img
        class="image_affiche_header"
        [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + randomMovie.poster_path"
        [alt]="randomMovie.title"
      />
      <h3>{{ randomMovie.title }}</h3>
      <p>{{ randomMovie.overview }}</p>
    </div>
    } @else {
    <p>Chargement du film...</p>
    }
  `,
  styleUrl: './header.css',
})
export class Header implements OnInit {
  movies: Movie[] = [];
  randomMovie?: Movie;
  constructor(private http: HttpApiHomePage) {}

  ngOnInit(): void {
    this.http.fetchMedia().subscribe({
      next: (data) => {
        this.movies = data.results;

        const randomIndex = Math.floor(Math.random() * this.movies.length);
        this.randomMovie = this.movies[randomIndex];

        console.log('Film choisi :', this.randomMovie);
      },
      error: (err) => console.error(err),
    });
  }
}
