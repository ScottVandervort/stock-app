import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  constructor( private http: HttpClient ) { }

  getQuote(ticker: string) : Observable<Quote> {
    
    let url = environment.tickerServiceUrl + "query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=" + environment.tickerServiceApiKey;

    return this.http.get<Quote>(url).pipe(map( res =>
      {
        let result : Quote = new Quote(ticker,0,0,0,0,0,"N/A",0,0,0);

        if (typeof res["Note"] != 'undefined' ) {
          // TODO: Handle error from REST service? For now we'll just log it.
          console.error(res["Note"]);
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
