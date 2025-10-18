import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpApiByCard } from '../service/http-api-by-card';

interface MovieAndSerie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export interface MediaByIdType {
  type?: "movie" | "tv";
}  


@Component({
  selector: 'app-card-by-id',
  standalone: true,
  imports: [CommonModule],
  template:  `
   @if (media) {
  <div>
    <h1>{{ media.title }}</h1>
    <img
      [src]="'https://image.tmdb.org/t/p/w500' + media.poster_path"
      alt="{{ media.title }}"
    />
    <p>{{ media.overview }}</p>
  </div>
}

  `, 
  styleUrls: ['./card-by-id.scss']
})
export class CardById implements OnInit {
  media?: MovieAndSerie;

  constructor(
    private http: HttpApiByCard,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type') as 'movie' | 'tv';
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (type && id) {
      this.http.fetchByCards(type, id).subscribe({
        next: (data) => (this.media = data),
        error: (err) => console.error(err),
      });
    }
  }
}
