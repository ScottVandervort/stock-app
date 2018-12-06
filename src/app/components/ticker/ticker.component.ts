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
  symbolSubscription : Subscription;
  isLoading : boolean = false;

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
      this.symbolSubscription.unsubscribe();
  }

  public deleteSymbol ( symbol: string) {
    this.localStorageService.removeSymbol(symbol);
  }

  private init () {
    
    // Get all stock symbols in the user's portfolio...
    this.symbols = this.localStorageService.getSymbols();       
    // ... and initialize empty quotes for them.
    this.symbols.forEach( symbol => {  
      this.quotes.push( new Quote(symbol,0,0,0,0,0,"N/A",0,0,0))      
    });

    // Subscribe to changes to the users' portfolio ...
    this.symbolSubscription = this.localStorageService.watchSymbols().subscribe( msg => {
      if (msg.isAdded) {
        // A stock symbol has been added ...
        this.symbols.push( msg.obj );
        // ...  initialize empty quotes for new symbols so that they can be tracked.
        this.quotes.push( new Quote(msg.obj,0,0,0,0,0,"N/A",0,0,0) )  
      }
      else {
        // A symbol has been removed ...

        // Need to remove it from two places. The list of symbols ...
        for (var stockSymbolIndex = this.symbols.length-1; stockSymbolIndex>=0;stockSymbolIndex--) {
            if (this.symbols[stockSymbolIndex] == msg.obj) {
              this.symbols.splice(stockSymbolIndex,1);
              break;
            }
        }

        // ... and the list of Quotes ...
        for (var stockSymbolIndex = this.quotes.length-1; stockSymbolIndex>=0;stockSymbolIndex--) {
          if (this.quotes[stockSymbolIndex].symbol == msg.obj) {
            this.quotes.splice(stockSymbolIndex,1);
            break;
          }
        }        
      }
    });
    
    this.lookupStockSymbols();    
  }

  // Gets quotes for each of the stock symbols.
  private lookupStockSymbols () {
    
    var quotesToLoad = this.symbols.length;
    
    this.isLoading = true;

    this.symbols.forEach( symbol => {      
      
      this.tickerService.getQuote(symbol).subscribe( 
        newQuote => {
  
          let oldQuote = this.quotes.find( quote => quote.symbol == newQuote.symbol);
        
          if (typeof oldQuote != 'undefined') {    
            oldQuote.change = newQuote.change;
            oldQuote.price = newQuote.price;                     
          }
                      
          quotesToLoad--;
          if (quotesToLoad <= 0) {
            this.lastUpdated = new Date();          
            this.isLoading = false;
          }
        }
      )
    })
  }
}
