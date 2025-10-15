import { Component, OnInit } from '@angular/core';
import { HttpApiSeries } from '../service/http-api-series';
import { CommonModule } from '@angular/common';
interface Serie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}
@Component({
  selector: 'app-series',
  imports: [CommonModule],
  template: `
    <h1>Séries les plus populaires en ce moment</h1>
    @for(popular of populars; track popular.id ) {
    <li>
      <img
        class="image_affiche"
        [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + popular.poster_path"
        [alt]="popular.title"
      />
      <h3>{{ popular.title }}</h3>
      <p>{{ popular.overview }}</p>
    </li>
    }
    <h1>Séries qui font le buzz cette semaine</h1>
    @for(trend of trends; track trend.id ) {
    <li>
      <img
        class="image_affiche"
        [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + trend.poster_path"
        [alt]="trend.title"
      />
      <h3>{{ trend.title }}</h3>
      <p>{{ trend.overview }}</p>
    </li>
    }
    <h1>Saison en cours</h1>
    @for(onAir of onAirs; track onAir.id ) {
    <li>
      <img
        class="image_affiche"
        [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + onAir.poster_path"
        [alt]="onAir.title"
      />
      <h3>{{ onAir.title }}</h3>
      <p>{{ onAir.overview }}</p>
    </li>
    }
    <h1>Séries les mieux notées</h1>
    @for(topRated of topRateds; track topRated.id ) {
    <li>
      <img
        class="image_affiche"
        [src]="'https://media.themoviedb.org/t/p/w600_and_h900_bestv2' + topRated.poster_path"
        [alt]="topRated.title"
      />
      <h3>{{ topRated.title }}</h3>
      <p>{{ topRated.overview }}</p>
    </li>
    }
  `,
  styleUrl: './series.css',
})
export class Series implements OnInit {
  populars: Serie[] = [];
  trends: Serie[] = [];
  onAirs: Serie[] = [];
  topRateds: Serie[] = [];
  constructor(private http: HttpApiSeries) {}
  ngOnInit(): void {
    this.http.fetchSeriePopular().subscribe({
      next: (data) => ((this.populars = data.results), console.log(data)),
      error: (err) => console.error(err),
    });

    this.http.fetchSerieTrend().subscribe({
      next: (data) => ((this.trends = data.results), console.log(data)),
      error: (err) => console.error(err),
    });
    this.http.fetchSerieOnAir().subscribe({
      next: (data) => ((this.onAirs = data.results), console.log(data)),
      error: (err) => console.error(err),
    });
    this.http.fetchSerieTopRated().subscribe({
      next: (data) => ((this.topRateds = data.results), console.log(data)),
      error: (err) => console.error(err),
    });
  }
}
