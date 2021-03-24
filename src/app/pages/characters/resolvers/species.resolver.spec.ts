import { TestBed } from '@angular/core/testing';

import { SpeciesResolver } from './species.resolver';

describe('SpeciesResolver', () => {
  let resolver: SpeciesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SpeciesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
