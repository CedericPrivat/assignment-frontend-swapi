import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterDetails } from '../../models/character-details';

@Component({
  selector: 'swapi-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  characterDetails$: Observable<CharacterDetails | null>;

  constructor(
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    this.characterDetails$ = this._getCharacterDetails$();
  }

  goback() {
    this._location.back();
  }

  private _getCharacterDetails$(): Observable<CharacterDetails | null> {
    return this._route.data.pipe(
      map(data => data.characterDetails as CharacterDetails)
    );
  }
}
