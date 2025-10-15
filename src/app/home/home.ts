import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpApiHomePage } from '../service/http-api-homePage';
import { Header } from '../header/header';
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header],
  template: `
    <app-header></app-header>
    <h1>Film populaire à l’affiche</h1>
    <div class="all_movie">
      @for(movie of movies; track movie.id ) {
      <li>
        <img
          class="image_affiche"
          [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path"
          [alt]="movie.title"
        />
        <h3>{{ movie.title }}</h3>
      </li>
      }
    </div>

    <h1>Films du moment</h1>
    <div class="all_movie">
      @for(trend of trends; track trend.id ) {
      <li>
        <img
          class="image_affiche"
          [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + trend.poster_path"
          [alt]="trend.title"
        />
        <h3>{{ trend.title }}</h3>
      </li>
      }
    </div>
    <h1>Tendances actuelles</h1>
    <div class="all_movie">
      @for(latest of latests; track latest.id ) {
      <li>
        <img
          class="image_affiche"
          [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + latest.poster_path"
          [alt]="latest.title"
        />
        <h3>{{ latest.title }}</h3>
      </li>
      }
    </div>

    <h1>Film les mieux notés</h1>
    <div class="all_movie">
      @for (topRated of topRateds ;track topRated.id){
      <li>
        <img
          class="image_affiche"
          [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + topRated.poster_path"
          [alt]="topRated.title"
        />
        <h3>{{ topRated.title }}</h3>
      </li>
      }
    </div>
  `,
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  movies: Movie[] = [];
  trends: Movie[] = [];
  latests: Movie[] = [];
  topRateds: Movie[] = [];
  constructor(private http: HttpApiHomePage) {}

  ngOnInit(): void {
    this.http.fetchMedia().subscribe({
      next: (data) => ((this.movies = data.results), console.log(data)),
      error: (err) => console.error(err),
    });

    this.http.fetchMovieTrend().subscribe({
      next: (data) => ((this.trends = data.results), console.log(data)),
      error: (err) => console.error(err),
    });

    this.http.fetchLatestMovie().subscribe({
      next: (data) => ((this.latests = data.results), console.log(data)),
      error: (err) => console.error(err),
    });

    this.http.topRated().subscribe({
      next: (data) => ((this.topRateds = data.results), console.log(data)),
      error: (err) => console.error(err),
    });
  }
}
