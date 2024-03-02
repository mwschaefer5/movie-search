import {Component, Inject, inject, OnInit} from '@angular/core';
import {SearchService} from "../search.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MovieDetail} from "./movie-details.model";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    MatDialogActions
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  private _searchService = inject(SearchService);
  movieDetail: MovieDetail | null = null;
  genres: string[] = [];
  isReady = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }) {}

  ngOnInit() {
    this._searchService.searchSpecificMovie(this.data.id);
    this._searchService.currentMovieDetail$.subscribe((movie: MovieDetail) => {
      if (movie.id === this.data.id) {
        this.movieDetail = movie;
        this.genres = this.movieDetail.genres.map((genre) => genre.title)
        this.isReady = true;
      }
    });
  }
}
