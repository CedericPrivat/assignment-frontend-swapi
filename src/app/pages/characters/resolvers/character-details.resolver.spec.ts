import { TestBed } from '@angular/core/testing';

import { CharacterDetailsResolver } from './character-details.resolver';

describe('CharacterDetailsResolver', () => {
  let resolver: CharacterDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CharacterDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
