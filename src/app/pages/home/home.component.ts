import { Component } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBarComponent, MovieCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  movies: any[] = [];
  searchTerm: string = '';

  constructor(private movieService: MovieService) {}

  searchMovies(searchTerm: string) {
    if (!searchTerm) return;
    this.movieService.searchMovies(searchTerm).subscribe((res: any) => {
      this.movies = res.Search || [];
    });
  }
}