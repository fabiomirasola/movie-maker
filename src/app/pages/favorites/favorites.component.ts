import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites: any[] = [];  

  ngOnInit() {
    const storedFavorites = localStorage.getItem('favoris');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    console.log(this.favorites);
  }
}
