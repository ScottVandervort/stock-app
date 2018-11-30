import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { TickerService } from '../../services/ticker.service';
import { Quote } from '../../models/quote';
import { Subscription } from 'rxjs';

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
  addSymbolSubscription : Subscription;
  
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
      this.addSymbolSubscription.unsubscribe();
  }

  private init () {
    
    // Get all stock symbols in the user's portfolio...
    this.symbols = this.localStorageService.getSymbols();       
    // ... and initialize empty quotes for them.
    this.symbols.forEach( symbol => {  
      this.quotes.push( new Quote(symbol,0,0,0,0,0,"N/A",0,0,0))      
    });

    // Subscribe to add" changes to the users' portfolio ...
    this.addSymbolSubscription = this.localStorageService.watchSymbols().subscribe( symbol => {
        // ... and initialize empty quotes for them so that they may be tracked.
      this.symbols.push( symbol );
      this.quotes.push( new Quote(symbol,0,0,0,0,0,"N/A",0,0,0) )  
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
