import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { TickerService } from '../../services/ticker.service';
import { Quote } from '../../models/quote';

const StockLookupInterval : number = 3600000; // 1 hour.
const IndividualStockDelay : number = 5000;   // 5 seconds. 

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit, OnDestroy {

  stockSymbols : string [] = [];
  stockQuotes : Quote [] = [];
  intervalHandle : any;
  lastUpdated : Date;
  
  constructor(private tickerService : TickerService, private localStorageService : LocalStorageService) {}

  ngOnInit() {

    this.init();

    this.intervalHandle = setInterval( interval => {      
      this.lookupStockSymbols();
    }, 
    StockLookupInterval);
  }

  ngOnDestroy() {
      clearInterval(this.intervalHandle);
  }

  private init () {
    this.stockSymbols = this.localStorageService.getSymbols();   
    
    this.stockSymbols.forEach( symbol => {  
      this.stockQuotes.push( new Quote(symbol,null,null,null,null,null,null,null,null,null))      
    });

    this.lookupStockSymbols();    
  }

  private lookupStockSymbols () {

    // TODO : STock symbols and quotes need to be looked up and cached in the TickerService. That way the data can shared ( the logic here will be simplified as well ).

    this.stockSymbols.forEach( symbol => {      

      setTimeout(timeout => {
        this.tickerService.getQuote(symbol).subscribe( newQuote => {
          
          this.stockQuotes.forEach( oldQuote => {
            if (oldQuote.symbol == newQuote.symbol) {
              oldQuote.change = newQuote.change;
              oldQuote.price = newQuote.change;              
            }
          });

        })
      },
      IndividualStockDelay);
    })    

    this.lastUpdated = new Date();
  }
}
