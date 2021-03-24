import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailsResolver } from './resolvers/character-details.resolver';
import { CharactersResolver } from './resolvers/characters.resolver';

const routes: Routes = [
  {
    path: '',
    component: CharactersComponent,
    children: [
      {
        path: '',
        component: CharacterListComponent,
        resolve: {
          characters: CharactersResolver
        }
      },
      {
        path: ':id',
        component: CharacterDetailsComponent,
        resolve: {
          characterDetails: CharacterDetailsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
