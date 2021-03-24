import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../models/character';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../responses/api-response';
import { expand, reduce, shareReplay } from 'rxjs/operators';
import { Helper } from '@shared/helper/utilities/helper';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characters$!: Observable<Character[]>;

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Character[]> {
    const url = `${environment.apiUrl}/people/`;
    if (!this.characters$) {
      this.characters$ = this._httpClient.get<ApiResponse>(url).pipe(
        expand(res => res.next ? this._httpClient.get<ApiResponse>(Helper.changeUrlToHttps(res.next)) : EMPTY),
        reduce((acc, res) => acc.concat(res.results), [] as Character[]),
        shareReplay(1)
      );
    }
    return this.characters$;
  }

  getById(id: string): Observable<Character> {
    const url = `${environment.apiUrl}/people/${id}/`;
    return this._httpClient.get<Character>(Helper.changeUrlToHttps(url));
  }
}
