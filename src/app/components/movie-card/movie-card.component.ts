import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}

