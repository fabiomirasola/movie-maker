import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin ,map, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = '236c83b1';
  private apiUrl = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  searchMovies(query: string) : Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}?apikey=${this.apiKey}&s=${query}`).pipe(
      map(response => response.Search || [])
    );
  }

  getMovieDetails(imdbID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}&plot=full`);
  }

  getMoviesWithDetails(query: string): Observable<any[]> {
    return this.searchMovies(query).pipe(
      switchMap(movies =>{
        if (movies.length === 0) {return new Observable<any[]>(observer => {
          observer.next([]);
          observer.complete();
        });}
        const requests : Observable <any> = movies.map((movie: any) => this.getMovieDetails(movie.imdbID));
        return forkJoin(requests);
      })
    )
  }
}