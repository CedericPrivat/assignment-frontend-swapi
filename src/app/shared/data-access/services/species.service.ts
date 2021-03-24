import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helper } from '@shared/helper/utilities/helper';
import { Species } from '../models/species';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private _httpClient: HttpClient) { }

  getByUrl(url: string) {
    return this._httpClient.get<Species>(Helper.changeUrlToHttps(url));
  }
}
