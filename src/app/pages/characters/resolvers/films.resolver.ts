import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Film } from '@shared/data-access/models/film';
import { FilmService } from '@shared/data-access/services/film.service';

@Injectable({
  providedIn: 'root'
})
export class FilmsResolver implements Resolve<Promise<Film[] | null>> {
  constructor(private _filmService: FilmService) { }

  async resolve(): Promise<Film[] | null> {
    try {
      return await this._filmService.getAll().toPromise();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
