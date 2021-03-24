import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helper } from '@shared/helper/utilities/helper';
import { EMPTY, Observable } from 'rxjs';
import { expand, reduce, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Film } from '../models/film';
import { ApiResponse } from '../responses/api-response';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films$!: Observable<Film[]>;

  constructor(private _httpClient: HttpClient) { }

  getByUrl(url: string): Observable<Film> {
    return this._httpClient.get<Film>(Helper.changeUrlToHttps(url));
  }

  getAll(): Observable<Film[]> {
    const url = `${environment.apiUrl}/films/`;
    if (!this.films$) {
      this.films$ = this._httpClient.get<ApiResponse>(url).pipe(
        expand(res => res.next ? this._httpClient.get<ApiResponse>(Helper.changeUrlToHttps(res.next)) : EMPTY),
        reduce((acc, res) => acc.concat(res.results), [] as Film[]),
        shareReplay(1)
      );
    }
    return this.films$;
  }
}
