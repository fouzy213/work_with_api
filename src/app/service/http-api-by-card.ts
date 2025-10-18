import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

interface MovieAndSerie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpApiByCard {
  url: string = environment.apiUrl;
  token: string = environment.apiToken;

  constructor(private http: HttpClient) {}

  fetchByCards(type: 'movie' | 'tv', id: number): Observable<MovieAndSerie> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<MovieAndSerie>(
      `${this.url}/${type}/${id}?language=fr-FR`,
      { headers }
    );
  }
}
