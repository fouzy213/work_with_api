import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Serie {
  id: number;
  poster_path: string;
  overview: string;
  name:string
}

@Injectable({
  providedIn: 'root',
})
export class HttpApiSeries {
  url: string = environment.apiUrl;
  token: string = environment.apiToken;

  constructor(private http: HttpClient) {}

  fetchSeriePopular(): Observable<{ results: Serie[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: Serie[] }>(`${this.url}/tv/popular?language=fr-FR&page=1`, {
      headers,
    });
  }

  fetchSerieTrend(): Observable<{ results: Serie[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: Serie[] }>(`${this.url}/trending/tv/week?language=fr-FR`, {
      headers,
    });
  }

  fetchSerieOnAir(): Observable<{ results: Serie[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: Serie[] }>(`${this.url}/tv/on_the_air?language=fr-FR&page=1`, {
      headers,
    });
  }

  fetchSerieTopRated(): Observable<{ results: Serie[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get<{ results: Serie[] }>(`${this.url}/tv/top_rated?language=fr-FR&page=1`, {
      headers,
    });
  }
}
