import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Character } from '@shared/data-access/models/character';
import { CharacterService } from '@shared/data-access/services/character.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersResolver implements Resolve<Promise<Character[] | null>> {
  constructor(private _characterService: CharacterService) { }

  async resolve(): Promise<Character[] | null> {
    try {
      return await this._characterService.getAll().toPromise();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
