import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@shared/data-access/models/character';
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
  getIdFromUrl = Helper.getIdFromUrl;

  constructor(private _route: ActivatedRoute) {
    this.characters$ = this._createCharacters$();
  }

  private _createCharacters$(): Observable<Character[] | null> {
    return this._route.data.pipe(
      map(data => data.characters as Character[])
    );
  }
}
