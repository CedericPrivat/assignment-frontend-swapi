import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helper } from '@shared/helper/utilities/helper';
import { EMPTY, Observable } from 'rxjs';
import { expand, reduce, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Species } from '../models/species';
import { ApiResponse } from '../responses/api-response';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  species$!: Observable<Species[]>;
  constructor(private _httpClient: HttpClient) { }

  getByUrl(url: string): Observable<Species> {
    return this._httpClient.get<Species>(Helper.changeUrlToHttps(url));
  }

  getAll(): Observable<Species[]> {
    const url = `${environment.apiUrl}/species/`;
    if (!this.species$) {
      this.species$ = this._httpClient.get<ApiResponse>(url).pipe(
        expand(res => res.next ? this._httpClient.get<ApiResponse>(Helper.changeUrlToHttps(res.next)) : EMPTY),
        reduce((acc, res) => acc.concat(res.results), [] as Species[]),
        shareReplay(1)
      );
    }
    return this.species$;
  }
}
