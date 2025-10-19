import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpApiSeries } from '../service/http-api-series';
import { RouterLink } from '@angular/router';

interface Serie {
  id: number;
  poster_path: string;
  overview: string;
  name: string;
}

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="carousel-section">
      <h2>Séries les plus populaires en ce moment</h2>
      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(0)"></button>
        <div class="carousel" #carousel>
          <ul class="serie-list">
            @for(popular of populars; track popular.id) {
            <li>
              <a [routerLink]="['/', getSerieType(popular), popular.id]">
                <img
                  [src]="
                    'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + popular.poster_path
                  "
                  [alt]="popular.name"
                />
              </a>

              <h4>{{ popular.name }}</h4>
            </li>
            }
          </ul>
        </div>
        <button class="arrow right" (click)="scrollRight(0)"></button>
      </div>
    </section>

    <section class="carousel-section">
      <h2>Séries qui font le buzz cette semaine</h2>
      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(1)"></button>
        <div class="carousel" #carousel>
          <ul class="serie-list">
            @for(trend of trends; track trend.id) {
            <li>
              <a [routerLink]="['/', getSerieType(trend), trend.id]">
                <img
                  [src]="
                    'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + trend.poster_path
                  "
                  [alt]="trend.name"
                />
              </a>

              <h3>{{ trend.name }}</h3>
            </li>
            }
          </ul>
        </div>
        <button class="arrow right" (click)="scrollRight(1)"></button>
      </div>
    </section>

    <section class="carousel-section">
      <h2>Saisons en cours</h2>
      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(2)"></button>
        <div class="carousel" #carousel>
          <ul class="serie-list">
            @for(onAir of onAirs; track onAir.id) {
            <li>
              <a [routerLink]="['/', getSerieType(onAir), onAir.id]">
                <img
                  [src]="
                    'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + onAir.poster_path
                  "
                  [alt]="onAir.name"
                />
              </a>

              <h3>{{ onAir.name }}</h3>
            </li>
            }
          </ul>
        </div>
        <button class="arrow right" (click)="scrollRight(2)"></button>
      </div>
    </section>

    <section class="carousel-section">
      <h2>Séries les mieux notées</h2>
      <div class="carousel-container">
        <button class="arrow left" (click)="scrollLeft(3)"></button>
        <div class="carousel" #carousel>
          <ul class="serie-list">
            @for(topRated of topRateds; track topRated.id) {
            <li>
              <a [routerLink]="['/', getSerieType(topRated), topRated.id]">
                <img
                  [src]="
                    'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + topRated.poster_path
                  "
                  [alt]="topRated.name"
                />
              </a>

              <h3>{{ topRated.name }}</h3>
            </li>
            }
          </ul>
        </div>
        <button class="arrow right" (click)="scrollRight(3)"></button>
      </div>
    </section>
  `,
  styleUrls: ['./series.scss'],
})
export class Series implements OnInit {
  populars: Serie[] = [];
  trends: Serie[] = [];
  onAirs: Serie[] = [];
  topRateds: Serie[] = [];

  @ViewChildren('carousel') carousels!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private http: HttpApiSeries) {}

  ngOnInit(): void {
    this.http.fetchSeriePopular().subscribe({
      next: (data) => (this.populars = data.results),
      error: (err) => console.error(err),
    });

    this.http.fetchSerieTrend().subscribe({
      next: (data) => (this.trends = data.results),
      error: (err) => console.error(err),
    });

    this.http.fetchSerieOnAir().subscribe({
      next: (data) => (this.onAirs = data.results),
      error: (err) => console.error(err),
    });

    this.http.fetchSerieTopRated().subscribe({
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

  getSerieType(movie: any): 'movie' | 'tv' {
    return movie.type !== 'tv' ? 'tv' : 'movie';
  }
}
