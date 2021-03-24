import { TestBed } from '@angular/core/testing';

import { FilmsResolver } from './films.resolver';

describe('FilmsResolver', () => {
  let resolver: FilmsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FilmsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
