import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpApiHomePage {
  url: string = environment.apiUrl;
  token: string = environment.apiToken;

  constructor(private http: HttpClient) {}

  fetchMedia(): Observable<{ results: Movie[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: Movie[] }>(`${this.url}/movie/popular?language=fr-FR`, {
      headers,
    });
  }

  fetchMovieTrend(): Observable<{ results: Movie[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: Movie[] }>(`${this.url}/trending/all/day?language=fr-FR`, {
      headers,
    });
  }
  fetchLatestMovie(): Observable<{ results: Movie[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: Movie[] }>(
      `${this.url}/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&primary_release_year=1&primary_release_date.lte=2025-09-08&sort_by=primary_release_date.dsc`,
      {
        headers,
      }
    );
  }

  topRated(): Observable<{ results: Movie[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: Movie[] }>(
      `${this.url}/movie/top_rated?language=fr-FR&page=1`,
      {
        headers,
      }
    );
  }
}
