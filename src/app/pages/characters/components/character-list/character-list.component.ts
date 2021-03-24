import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@shared/data-access/models/character';
import { Film } from '@shared/data-access/models/film';
import { Species } from '@shared/data-access/models/species';
import { Helper } from '@shared/helper/utilities/helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'swapi-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  characters$: Observable<Character[] | null>;
  films$: Observable<Film[] | null>;
  species$: Observable<Species[] | null>;
  getIdFromUrl = Helper.getIdFromUrl;

  constructor(private _route: ActivatedRoute) {
    this.characters$ = this._createCharacters$();
    this.films$ = this._getFilms$();
    this.species$ = this._getSpecies$();
  }

  private _createCharacters$(): Observable<Character[] | null> {
    return this._route.data.pipe(
      map(data => data.characters as Character[])
    );
  }

  private _getFilms$(): Observable<Film[] | null> {
    return this._route.data.pipe(
      map(data => data.films as Film[])
    );
  }

  private _getSpecies$(): Observable<Species[] | null> {
    return this._route.data.pipe(
      map(data => data.species as Species[])
    );
  }
}
