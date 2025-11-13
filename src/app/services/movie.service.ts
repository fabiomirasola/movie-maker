import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = '236c83b1';
  private apiUrl = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  searchMovies(query: string) {
    return this.http.get(`${this.apiUrl}?apikey=${this.apiKey}&s=${query}`);
  }
}