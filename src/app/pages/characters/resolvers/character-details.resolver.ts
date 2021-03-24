import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Film } from '@shared/data-access/models/film';
import { Species } from '@shared/data-access/models/species';
import { Starship } from '@shared/data-access/models/starship';
import { CharacterService } from '@shared/data-access/services/character.service';
import { FilmService } from '@shared/data-access/services/film.service';
import { SpeciesService } from '@shared/data-access/services/species.service';
import { StarshipService } from '@shared/data-access/services/starship.service';
import { CharacterDetails } from '../models/character-details';

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailsResolver implements Resolve<Promise<CharacterDetails | null>> {
  constructor(
    private _characterService: CharacterService,
    private _speciesService: SpeciesService,
    private _filmService: FilmService,
    private _starshipService: StarshipService
  ) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<CharacterDetails | null> {
    const id = route.params.id;
    const character = await this._characterService.getById(id).toPromise();
    const species = await this._getResource<Species>(character.species, this._speciesService);
    const films = await this._getResource<Film>(character.films, this._filmService);
    const starships = await this._getResource<Starship>(character.starships, this._starshipService);

    return { character, films, species, starships };
  }

  private async _getResource<T>(urls: string[], service: any) {
    const resources: T[] = [];
    for (const url of urls) {
      resources.push(await service.getByUrl(url).toPromise());
    }
    return resources;
  }
}
