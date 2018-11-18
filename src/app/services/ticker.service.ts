import { OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Quote } from '../models/quote';

const PortfolioLookupInterval : number = 600000; // 10 minutes.
const QuoteLookupInterval : number = 30000;   // 30 seconds. 

@Injectable({
  providedIn: 'root'
})
export class TickerService implements OnDestroy {

  private quoteIntervalHandle : any;
  private portfolioIntervalHandle : any;
  private isRefreshingStockQuotes : boolean = false;

  // This is a cache of quotes.
  private quotes : Quote[] = [];

  constructor( private http: HttpClient ) { 

    // Periodically fetch quotes. 
    this.portfolioIntervalHandle = setInterval( interval => this.refreshStockQuotes(), 
                                                PortfolioLookupInterval); 
  }

  ngOnDestroy() {
    clearInterval(this.quoteIntervalHandle);
    clearInterval(this.portfolioIntervalHandle);
  }  

  // Gets a quote for the specified symbol.
  public getQuote(symbol: string ) : Observable<Quote> {

    // Does a quote for the symbol exist in the cache?
    let quote : Quote = this.quotes.find( quote => (quote.symbol == symbol));
    let observable : Observable<Quote>;

    if (typeof quote == 'undefined') {

      // Nope. Fetch a quote for the symbol from the REST service ...

      console.info(symbol + " does NOT exist in cache!");

      observable = this.getQuoteFromRESTService(symbol);
      
      observable.subscribe( 
        newQuote => {
          this.quotes.push(newQuote);
        }, 
        error => {          
          console.error("Error when looking up quote for " + symbol + ". Error: " + error);   
        });

      return observable;
    }
    else {

      // Yup. Immediately resolve with the cahced quote ...

      console.info(symbol + " DOES exist in cache!");      

      observable = Observable.create(function (observer) {
        observer.next(quote);
        observer.complete();
      });
    }

    return observable;
  }

  // Refreshes all of the quotes maintained in the cache.
  private refreshStockQuotes () {

    console.info("Entering refreshStockQuotes()");

    if (this.isRefreshingStockQuotes)
      return; // Already refreshing quotes so there is nothing to do ...

    if (this.quotes.length == 0)
      return; // Nothing to look up ...

    this.isRefreshingStockQuotes = true;

    let quoteLookupIndex = 0;

    this.quoteIntervalHandle = setInterval( interval => {

      this.getQuoteFromRESTService(this.quotes[quoteLookupIndex].symbol).subscribe( 
                    newQuote => {
                      this.quotes[quoteLookupIndex].change = newQuote.change;
                      this.quotes[quoteLookupIndex].changePercent = newQuote.changePercent;
                      this.quotes[quoteLookupIndex].high = newQuote.high;
                      this.quotes[quoteLookupIndex].latestTradingDay = newQuote.latestTradingDay;
                      this.quotes[quoteLookupIndex].low = newQuote.low;
                      this.quotes[quoteLookupIndex].open = newQuote.open;
                      this.quotes[quoteLookupIndex].previousClose = newQuote.previousClose;
                      this.quotes[quoteLookupIndex].price = newQuote.price;
                      this.quotes[quoteLookupIndex].volume = newQuote.volume;

                      quoteLookupIndex++; // Lookup quote for next symbol;                       
                      if (quoteLookupIndex > this.quotes.length -1) {
                        clearInterval(this.quoteIntervalHandle);
                        this.isRefreshingStockQuotes = false;
                      }
                      
                    }, 
                    error => {                      
                      
                      // Do not update the quote for the current stock symbol as the REST service barfed.

                      console.error("Error when looking up quote for " + this.quotes[quoteLookupIndex].symbol + ". Error: " + error);                  
                                            
                      quoteLookupIndex++; // Lookup quote for next symbol; Better luck next time...
                      if (quoteLookupIndex > this.quotes.length -1)  {
                        clearInterval(this.quoteIntervalHandle);
                        this.isRefreshingStockQuotes = false;
                      }
                    });
    },
    QuoteLookupInterval)
  }

  private getQuoteFromRESTService (ticker: string) : Observable<Quote> {
    
    let url = environment.tickerServiceUrl + "query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=" + environment.tickerServiceApiKey;

    return this.http.get<Quote>(url).pipe(map( res =>
      {
        let result : Quote;
        
        if (typeof res["Note"] != 'undefined' ) {          
          console.error(res["Note"]);
          throw res["Note"];  
        }
        else {
          result = new Quote(
            res["Global Quote"]["01. symbol"],
            res["Global Quote"]["02. open"],
            res["Global Quote"]["03. high"],
            res["Global Quote"]["04. low"],
            res["Global Quote"]["05. price"],
            res["Global Quote"]["06. volume"],
            res["Global Quote"]["07. latest trading day"],
            res["Global Quote"]["08. previous close"],
            res["Global Quote"]["09. change"],
            res["Global Quote"]["08. change percent"]
          )
        }

        return result;
      }));
    
    
  }
}
