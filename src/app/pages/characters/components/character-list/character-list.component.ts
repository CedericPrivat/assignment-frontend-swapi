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
  getIdFromUrl = Helper.getIdFromUrl;

  // Data
  characters$: Observable<Character[] | null>;
  films$: Observable<Film[] | null>;
  species$: Observable<Species[] | null>;

  // Form controls
  filmSelect = new FormControl();
  fromBirthYearInput = new FormControl();
  isBBYFromCheckbox = new FormControl();
  isBBYToCheckbox = new FormControl();
  speciesSelect = new FormControl();
  toBirthYearInput = new FormControl();

  constructor(private _route: ActivatedRoute) {
    this._setDefaultFormValues();
    this.characters$ = this._createCharacters$();
    this.films$ = this._getFilms$();
    this.species$ = this._getSpecies$();
  }

  private _setDefaultFormValues() {
    this.isBBYFromCheckbox.setValue(true);
    this.isBBYToCheckbox.setValue(true);
  }

  private _createCharacters$(): Observable<Character[] | null> {
    const characters$ = this._route.data.pipe(
      map(data => data.characters as Character[])
    );

    const film$ = this.filmSelect.valueChanges.pipe(startWith(null));
    const species$ = this.speciesSelect.valueChanges.pipe(startWith(null));
    const from$ = this.fromBirthYearInput.valueChanges.pipe(startWith(null));
    const to$ = this.toBirthYearInput.valueChanges.pipe(startWith(null));
    const isBBYFrom$ = this.isBBYFromCheckbox.valueChanges.pipe(startWith(true));
    const isBBYTo$ = this.isBBYToCheckbox.valueChanges.pipe(startWith(true));

    return combineLatest([characters$, film$, species$, from$, to$, isBBYFrom$, isBBYTo$]).pipe(
      map(([characters, film, species, from, to, isBBYFrom, isBBYTo]) => {
        return characters.filter((character: Character) => {
          return this._filter(character, film, species, from, to, isBBYFrom, isBBYTo);
        });
      })
    );
  }

  private _filter(
    character: Character,
    film: Film,
    species: Species,
    from: number,
    to: number,
    isBBYFrom: boolean,
    isBBYTo: boolean
  ): boolean {
    const birthYearNumber = this._getBirthYearAsNumber(character.birth_year);
    const fromNumber = this._getBirthYearInputAsNumber(from, isBBYFrom);
    const toNumber = this._getBirthYearInputAsNumber(to, isBBYTo);

    return this._match(character.films, film?.url)
      && this._match(character.species, species?.url)
      && this._between(birthYearNumber, fromNumber, toNumber);
  }

  private _match(input: string[] | string, val: string) {
    if (!val) return true;
    return (input).includes(val);
  }

  private _between(x: number | null, min: number | null, max: number | null): boolean {
    if (min === null && max === null) return true;
    if (x === null) return false;
    if (min === null && max != null) return x <= max;
    if (max === null && min != null) return x >= min;
    if (min !== null && max !== null) return (x >= min && x <= max);
    return false;
  };

  private _getBirthYearAsNumber(year: string): number | null {
    if (year === 'unknown') return null;
    const isBBY = year.slice(-3) === 'BBY' ? true : false;

    // Return negative number if year is BBY (Before the Battle of Yavin) and positive number if year is ABY (After the Battle of Yavin)
    if (isBBY) return -(+year.substring(0, year.length - 3));
    return +year.substring(0, year.length - 3);
  }

  private _getBirthYearInputAsNumber(val: number | null, bbyFactor: boolean): number | null {
    if (val === null) return null;
    return bbyFactor ? val * -1 : val;
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
