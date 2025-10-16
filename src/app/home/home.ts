import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
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

    <div class="carousel-section">
      <h2>Film populaire à l’affiche</h2>
      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(0)"></button>
        <div class="carousel" #carousel>
          <ul class="movie-list">
            @for(movie of movies; track movie.id) {
              <li>
                <img
                  [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path"
                  [alt]="movie.title"
                />
                <h4>{{ movie.title }}</h4>
              </li>
            }
          </ul>
        </div>
        <button class="arrow right" (click)="scrollRight(0)"></button>
      </div>
    </div>

    <div class="carousel-section">
      <h2>Films du moment</h2>
      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(1)"></button>
        <div class="carousel" #carousel>
          <ul class="movie-list">
            @for(trend of trends; track trend.id) {
              <li>
                <img
                  [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + trend.poster_path"
                  [alt]="trend.title"
                />
                <h4>{{ trend.title }}</h4>
              </li>
            }
          </ul>
        </div>
        <button class="arrow right" (click)="scrollRight(1)"></button>
      </div>
    </div>

    <div class="carousel-section">
      <h2>Tendances actuelles</h2>
      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(2)"></button>
        <div class="carousel" #carousel>
          <ul class="movie-list">
            @for(latest of latests; track latest.id) {
              <li>
                <img
                  [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + latest.poster_path"
                  [alt]="latest.title"
                />
                <h4>{{ latest.title }}</h4>
              </li>
            }
          </ul>
        </div>
        <button class="arrow right" (click)="scrollRight(2)"></button>
      </div>
    </div>
    
    <div class="carousel-section">
      <h2>Films les mieux notés</h2>
      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(3)"></button>
        <div class="carousel" #carousel>
          <ul class="movie-list">
            @for(topRated of topRateds; track topRated.id) {
              <li>
                <img
                  [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + topRated.poster_path"
                  [alt]="topRated.title"
                />
                <h4>{{ topRated.title }}</h4>
              </li>
            }
          </ul>
        </div>
        <button class="arrow right" (click)="scrollRight(3)"></button>
      </div>
    </div>
  `,
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  movies: Movie[] = [];
  trends: Movie[] = [];
  latests: Movie[] = [];
  topRateds: Movie[] = [];

  @ViewChildren('carousel') carousels!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private http: HttpApiHomePage) {}

  ngOnInit(): void {
    this.http.fetchMedia().subscribe({
      next: (data) => (this.movies = data.results),
      error: (err) => console.error(err),
    });

    this.http.fetchMovieTrend().subscribe({
      next: (data) => (this.trends = data.results),
      error: (err) => console.error(err),
    });

    this.http.fetchLatestMovie().subscribe({
      next: (data) => (this.latests = data.results),
      error: (err) => console.error(err),
    });

    this.http.topRated().subscribe({
      next: (data) => (this.topRateds = data.results),
      error: (err) => console.error(err),
    });
  }

  scrollLeft(sectionIndex: number) {
    const carousel = this.carousels.toArray()[sectionIndex]?.nativeElement;
    if (carousel) carousel.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(sectionIndex: number) {
    const carousel = this.carousels.toArray()[sectionIndex]?.nativeElement;
    if (carousel) carousel.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
