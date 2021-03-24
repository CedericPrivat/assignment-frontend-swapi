import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Species } from '@shared/data-access/models/species';
import { SpeciesService } from '@shared/data-access/services/species.service';

@Injectable({
  providedIn: 'root'
})
export class SpeciesResolver implements Resolve<Promise<Species[] | null>> {
  constructor(private _speciesService: SpeciesService) { }

  async resolve(): Promise<Species[] | null> {
    try {
      return await this._speciesService.getAll().toPromise();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
