import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ReplaySubject, Subject} from "rxjs";
import {mockData, MovieResult} from "./search-result/search-result.model";
import {mockMovieDetail, MovieDetail} from "./movie-details/movie-details.model";
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  _http = inject(HttpClient);
  private BASE_URL = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';
  private bearerToken: any;
  currentSearchResults$ = new Subject<MovieResult[]>();
  searchTotalPages$ = new Subject<number>();
  availableGenres$ = new ReplaySubject<string[]>();
  fetchedMovies: { [id: string]: MovieDetail } = { "7GQMaTpw7B0MInjOHis5yu": mockMovieDetail };
  currentMovieDetail$ = new ReplaySubject<MovieDetail>();

  constructor() { }

  // get bearer token
  initializeSearch() {
    this._http.get(`${this.BASE_URL}/auth/token`).subscribe((result: any) => {
      this.bearerToken = result.token;
      this.setGenres();
    });
  }
  searchLookup(searchText: string | null, page = 0, limit = 5, genre: string | null) {
    if (searchText && this.bearerToken) {
      const headers = this.buildHeaders();

      // build query params
      let params = `?page=${page}&limit=${limit}&search=${searchText}`;
      if (genre !== 'Any') {
        params += `&genre=${genre}`;
      }

      this._http.get(`${this.BASE_URL}/movies${params}`, { headers }).subscribe((result: any) => {
        this.currentSearchResults$.next(result.data);
        this.searchTotalPages$.next(result.totalPages);
      });
    }
    this.currentSearchResults$.next(mockData);
    this.searchTotalPages$.next(19);
  }

  searchSpecificMovie(id: string) {
    if (!this.fetchedMovies[id]) {
      if (this.bearerToken) {
        const headers = this.buildHeaders();
        this._http.get(`${this.BASE_URL}/movies/${id}`, {headers}).subscribe((result: any) => {
          this.fetchedMovies[id] = result;
          this.currentMovieDetail$.next(this.fetchedMovies[id]);
        });
      }
    } else {
      this.currentMovieDetail$.next(this.fetchedMovies[id]);
    }
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.bearerToken}`
    });
  }
  private setGenres() {
    if (this.bearerToken) {
      const headers = this.buildHeaders();
      this._http.get(`${this.BASE_URL}/genres/movies`, {headers}).subscribe((result: any) => {
        const genres: string[] = [];
        result.data.forEach((genre: any) => {
          genres.push(genre.title);
        });
        this.availableGenres$.next(genres);
      });
    }
  }
}
