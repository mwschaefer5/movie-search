import {Component, inject, OnInit} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {SearchService} from "./search.service";
import {MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {SearchResultComponent} from "./search-result/search-result.component";
import {MovieResult} from "./search-result/search-result.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatError,
    MatLabel,
    MatFormField,
    MatProgressSpinnerModule,
    SearchResultComponent,
    MatPaginator,
    MatSelect,
    MatOption
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  private _searchService = inject(SearchService);
  searchText = new FormControl('', [Validators.required]);
  genreSelection = new FormControl('Any');
  isLoading = false;
  isReady = false;
  results: MovieResult[] | null = null;
  genres: string[] = [];
  length = 1;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];


  ngOnInit() {
    this._searchService.initializeSearch();
    this._searchService.availableGenres$.subscribe((genres: string[]) => {
      this.genres = genres;
      this.isReady = true;
    });
    this._searchService.currentSearchResults$.subscribe((searchResults: MovieResult[]) => {
      this.results = searchResults;
      this.isLoading = false;
    });
    this._searchService.searchTotalPages$.subscribe((totalPages: number) => {
      this.length = totalPages * this.pageSize;
    });
  }

  search() {
    this.isLoading = true;
    this._searchService.searchLookup(this.searchText.value, this.pageIndex, this.pageSize, this.genreSelection.value);
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.search();
  }
}
