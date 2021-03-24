import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@shared/data-access/models/character';
import { Film } from '@shared/data-access/models/film';
import { Species } from '@shared/data-access/models/species';
import { Helper } from '@shared/helper/utilities/helper';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'swapi-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  isBBYFrom = true;
  isBBYTo = true;
  getIdFromUrl = Helper.getIdFromUrl;

  // Data
  characters$: Observable<Character[] | null>;
  films$: Observable<Film[] | null>;
  species$: Observable<Species[] | null>;

  // Form controls
  filmSelect = new FormControl();
  speciesSelect = new FormControl();

  constructor(private _route: ActivatedRoute) {
    this.characters$ = this._createCharacters$();
    this.films$ = this._getFilms$();
    this.species$ = this._getSpecies$();
  }

  private _createCharacters$(): Observable<Character[] | null> {
    const characters$ = this._route.data.pipe(
      map(data => data.characters as Character[])
    );

    const film$ = this.filmSelect.valueChanges.pipe(startWith(null));
    const species$ = this.speciesSelect.valueChanges.pipe(startWith(null));

    return combineLatest([characters$, film$, species$]).pipe(
      map(([characters, film, species]) => characters.filter((character: Character) => this._filter(character, film, species)))
    );
  }

  private _filter(character: Character, film: any, species: any): boolean {
    return this._match(character.films, film?.url) && this._match(character.species, species?.url);
  }

  private _match(input: string[] | string, val: string) {
    if (!val) return true;
    return (input).includes(val);
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
