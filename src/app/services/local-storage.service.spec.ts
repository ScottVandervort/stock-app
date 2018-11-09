import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { Services } from '@angular/core/src/view';

describe('LocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });

  it('can get symbols', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);

    service.addSymbol("msft");

    expect(service.getSymbols().length).toBeGreaterThan(0);

    expect(service).toBeTruthy();
  });  



});
