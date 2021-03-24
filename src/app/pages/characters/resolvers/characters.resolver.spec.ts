import { TestBed } from '@angular/core/testing';

import { CharactersResolver } from './characters.resolver';

describe('CharactersResolver', () => {
  let resolver: CharactersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CharactersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
