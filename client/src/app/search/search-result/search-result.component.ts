import {Component, inject, Input} from '@angular/core';
import {MovieResult} from "./search-result.model";
import {MatDialog} from "@angular/material/dialog";
import {MovieDetailsComponent} from "../movie-details/movie-details.component";

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  @Input() movie: MovieResult | null = null;

  private dialog = inject(MatDialog);
  getMovieDetails() {
    if (this.movie) {
      this.dialog.open(MovieDetailsComponent, {
        data: {
          id: this.movie?.id
        }
      });
    }
  }
}
