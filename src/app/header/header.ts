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
    <h1 class="title_movie">Film du moment</h1>

    @if (randomMovie) {
    <div class="single_movie">
      <img
        class="image_affiche_header"
        [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + randomMovie.poster_path"
        [alt]="randomMovie.title"
      />
      <div class="title_and_para">
      <h4 class="title_movie">{{ randomMovie.title }}</h4>
      <p class="para_movie">{{ randomMovie.overview }}</p>
      @if (!randomMovie.overview){
        <p class="para_movie">Il n'y a pas de synopsie du film dans l'API</p>
      }
    </div>
        </div>

    } @else {
    <p>Chargement du film...</p>
    }
  `,
  styleUrl: './header.scss',
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

      },
      error: (err) => console.error(err),
    });
  }
}
