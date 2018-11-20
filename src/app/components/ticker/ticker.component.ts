import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { TickerService } from '../../services/ticker.service';
import { Quote } from '../../models/quote';

const PortfolioLookupInterval : number = 10000; // 10 seconds.

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit, OnDestroy {

  symbols : string [] = [];
  quotes : Quote [] = [];
  portfolioIntervalHandle : any;
  lastUpdated : Date;
  
  constructor(private tickerService : TickerService, private localStorageService : LocalStorageService) {}

  ngOnInit() {

    this.init();

    // Periodically get new quotes for the stock symbols.
    this.portfolioIntervalHandle = setInterval( interval => {      
      this.lookupStockSymbols();
    }, 
    PortfolioLookupInterval);
  }

  ngOnDestroy() {
      clearInterval(this.portfolioIntervalHandle);
  }

  private init () {

    // Get all stock symbols in the user's portfolio...
    this.symbols = this.localStorageService.getSymbols();   
    
    // ... and initialize empty quotes for them ( they will be periodically refreshed with real data ).
    this.symbols.forEach( symbol => {  
      this.quotes.push( new Quote(symbol,0,0,0,0,0,"N/A",0,0,0))      
    });

    this.lookupStockSymbols();    
  }

  // Gets quotes for each of the stock symbols.
  private lookupStockSymbols () {

    this.symbols.forEach( symbol => {      
      
      this.tickerService.getQuote(symbol).subscribe( 
        newQuote => {
  
          let oldQuote = this.quotes.find( quote => quote.symbol == newQuote.symbol);
        
          if (typeof oldQuote != 'undefined') {    
            oldQuote.change = newQuote.change;
            oldQuote.price = newQuote.price;                     
          }
                      
          this.lastUpdated = new Date();          

        }
      )
    })
  }
}
