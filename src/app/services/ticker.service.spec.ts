import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TickerService } from './ticker.service';

describe('TickerserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }))
  
  it('should be created', () => {
    const service: TickerService = TestBed.get(TickerService);
    expect(service).toBeTruthy();
  });

  it('should return a quote (MSFT)', () => {
    const service: TickerService = TestBed.get(TickerService);
    service.getQuote("MSFT").subscribe( data => {        
        expect(data.symbol == "MSFT");
    });

  });
});
