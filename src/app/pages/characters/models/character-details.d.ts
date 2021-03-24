import { Character } from '@shared/data-access/models/character';
import { Film } from '@shared/data-access/models/film';
import { Species } from '@shared/data-access/models/species';
import { Starship } from '@shared/data-access/models/starship';

export interface CharacterDetails {
  character: Character;
  films: Film[];
  species: Species[];
  starships: Starship[];
}