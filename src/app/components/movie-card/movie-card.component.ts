import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../../assets/movie';

@Component({
  selector: 'app-movie-card',
  imports: [ CommonModule],
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie: any;

  fallback = 'noImage.jpg';

  get posterUrl(): string {
    return this.movie?.Poster && this.movie.Poster !== "N/A" ? this.movie.Poster : this.fallback;
  }

  isFavorite(movie: Movie): boolean {
    const favorites: Movie[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    return favorites.some(f => f.imdbID === movie.imdbID);
  }

  toggleFavorite(movie: Movie) {
    let favorites: Movie[] = JSON.parse(localStorage.getItem('favoris') || '[]');

    const index = favorites.findIndex((f: Movie) => f.imdbID === movie.imdbID);

    if (index > -1) {
      favorites.splice(index, 1); 
    } else {
      favorites.push(movie);
    }

    localStorage.setItem('favoris', JSON.stringify(favorites));
  }
}

