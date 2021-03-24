import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helper } from '@shared/helper/utilities/helper';
import { Starship } from '../models/starship';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {
  constructor(private _httpClient: HttpClient) { }

  getByUrl(url: string) {
    return this._httpClient.get<Starship>(Helper.changeUrlToHttps(url));
  }
}
