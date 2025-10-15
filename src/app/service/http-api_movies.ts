import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpApiMovies {
  url: string = environment.apiUrl;
  token: string = environment.apiToken;

  constructor(private http: HttpClient) {}

  fetchGenres(): Observable<{ genres: { id: number; name: string }[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ genres: { id: number; name: string }[] }>(
      `${this.url}/genre/movie/list?language=en-US`,
      { headers }
    );
  }

  fetchMoviesByGenre(genreId: number): Observable<{ results: any[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: any[] }>(
      `${this.url}/discover/movie?with_genres=${genreId}&language=en-US`,
      { headers }
    );
  }
}
