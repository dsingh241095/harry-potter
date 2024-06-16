import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { movieList, movieDetail } from '../movie-model/index'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  getmovieList(): Observable<movieList[]> {
    return this._httpClient.get<movieList[]>('/movies');
  }

  getMovieDetail(movieId: string | null): Observable<movieDetail> {
    return this._httpClient.get<movieDetail>('/movies/' + movieId)
  }
}
