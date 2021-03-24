import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helper } from '@shared/helper/utilities/helper';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  constructor(private _httpClient: HttpClient) { }

  getByUrl(url: string) {
    return this._httpClient.get<Film>(Helper.changeUrlToHttps(url));
  }
}
