import { SecurityContext } from '@angular/core';
import { Injectable } from '@angular/core';
import { Symbol } from '../models/symbol';
import { News } from '../models/news';
import { Changed } from '../models/changed';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { tree } from 'd3';

const LocalStorageDataName : string = 'stock-app-data';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageEnabled : boolean = false;
  private symbolSubject : Subject<Changed<string>> = new Subject<Changed<string>>();
  private newsSubject : Subject<Changed<News>> = new Subject<Changed<News>>();


  constructor(private sanitizer : DomSanitizer) { 
    this.storageEnabled = this.storageAvailable('localStorage');

    // Was originally going to use a ReplaySubject - but I wasn't really fond of this nested loop (N^2) - and the fact that ALL 
    // news articles would have to be broadcasted one-by-one every time a new subscriber was added.
    
    // this.getSymbols().forEach( symbol => { 
       
    //   this.symbolSubject.next(symbol);

    //   this.getNews(symbol).forEach( news => {

    //     this.newsSubject.next(new News(symbol,news));

    //   })            
    // });
  }

  addSymbol ( symbol: string ) {

    if ((typeof symbol == 'undefined') || (symbol == null) || symbol.trim() == '')
      return; // Symbol is invalid. Throw exception?

    if (!this.storageEnabled) 
      return; // Storage is not supported. Throw exception?      

    let data : Symbol [];

    // Scrub input for javascript and/or HTML ...
    symbol = symbol.trim().toUpperCase();
    symbol = this.sanitizer.sanitize(SecurityContext.HTML,symbol);    

    data = JSON.parse(localStorage.getItem(LocalStorageDataName)) || [];

    if (data!= null) 
      for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) {
        if (data[symbolIndex].symbol.toUpperCase().trim() == symbol) 
          return; // Ticker Symbol already exists. Throw exception?
      }

    data.push ( new Symbol(symbol, []) )

    // Notify subscribers that a new stock symbol has been added to the portfolio.
    this.symbolSubject.next(new Changed<string> (symbol, true));

    localStorage.setItem(LocalStorageDataName, JSON.stringify(data));
  }

  removeSymbol ( symbol: string ) {

    if ((typeof symbol == 'undefined') || (symbol == null) || symbol.trim() == '')
      return; // Symbol is invalid. Throw exception?

    if (!this.storageEnabled) 
      return; // Storage is not supported. Throw exception?      

    let data : Symbol [];

    // Scrub input for javascript and/or HTML ...
    symbol = symbol.trim().toUpperCase();
    symbol = this.sanitizer.sanitize(SecurityContext.HTML,symbol);    

    data = JSON.parse(localStorage.getItem(LocalStorageDataName)) || [];

    if (data!= null) 
      for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) {
        if (data[symbolIndex].symbol.toUpperCase().trim() == symbol) {

          data.splice(symbolIndex,1);
          break;
        }

      }

    // Notify subscribers that a new stock symbol has been removed to the portfolio.
    this.symbolSubject.next(new Changed<string>(symbol,false));

    localStorage.setItem(LocalStorageDataName, JSON.stringify(data));    
  }

  addNews ( symbol: string, news: string )  {

    if ((typeof symbol == 'undefined') || (symbol == null) || symbol.trim() == '')
      return; // Symbol is invalid. Throw exception?

    if ((typeof symbol == 'undefined') || (news == null) || news.trim() == '')
    return; // News is invalid. Throw exception?
      
    if (!this.storageEnabled) 
      return; // Storage is not supported. Throw exception?

    let data : Symbol [] = [];

    // Scrub input for javascript and/or HTML ...
    symbol = symbol.trim().toUpperCase();
    symbol = this.sanitizer.sanitize(SecurityContext.HTML,symbol);    
    
    news = this.sanitizer.sanitize(SecurityContext.HTML,news);    

    data = JSON.parse(localStorage.getItem(LocalStorageDataName)) || [];

    if (data!= null)     
      for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) 
        if (data[symbolIndex].symbol.toUpperCase().trim() == symbol)  {
          data[symbolIndex].news.push(news);
          break;
        }       

    // Notfy subscribers that a new news article has been added to a stock symbol inb the portfolio.
    let newsSubjectMsg : News = new News(symbol, news);
    this.newsSubject.next(new Changed<News>( newsSubjectMsg, true));        
    
    localStorage.setItem(LocalStorageDataName, JSON.stringify(data));
  }  

  public removeNews ( symbol: string, news : string) {
    if ((typeof symbol == 'undefined') || (symbol == null) || symbol.trim() == '')
      return; // Symbol is invalid. Throw exception?

    if ((typeof symbol == 'undefined') || (news == null) || news.trim() == '')
    return; // News is invalid. Throw exception?
      
    if (!this.storageEnabled) 
      return; // Storage is not supported. Throw exception?

    let data : Symbol [] = [];

    // Scrub input for javascript and/or HTML ...
    symbol = symbol.trim().toUpperCase();
    symbol = this.sanitizer.sanitize(SecurityContext.HTML,symbol);    
    
    news = this.sanitizer.sanitize(SecurityContext.HTML,news);    

    data = JSON.parse(localStorage.getItem(LocalStorageDataName)) || [];

    if (data!= null)     
      for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) 
        if (data[symbolIndex].symbol.toUpperCase().trim() == symbol)  {
          for (let newsIndex=0;newsIndex<data.length;newsIndex++) 


          data[symbolIndex].news.push(news);
          break;
        }       

    // Notfy subscribers that a new news article has been added to a stock symbol inb the portfolio.
    let newsSubjectMsg : News = new News(symbol, news);
    this.newsSubject.next(new Changed<News>( newsSubjectMsg, false));        
    
    localStorage.setItem(LocalStorageDataName, JSON.stringify(data));    
  }

  public watchSymbols () : Subject<Changed<string>> { 
    return this.symbolSubject;
  }

  public watchNews ( ) : Subject<Changed<News>> {
    return this.newsSubject;
  }

  public getSymbols () : string[] {

    if (!this.storageEnabled) 
      return []; // Storage is not supported.

    let data : Symbol [];
    let result : string [] = [];
      
    data = JSON.parse(localStorage.getItem(LocalStorageDataName));

    if (data != null)
      for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) 
        result.push(data[symbolIndex].symbol);

    return result;
  }

  public getNews ( symbol: string ) : string [] {

    if ((typeof symbol == 'undefined') || (symbol == null) || symbol.trim() == '')
      return []; // Symbol is invalid. Throw exception?

    if (!this.storageEnabled) 
      return; // Storage is not supported. Throw exception?    

    symbol = symbol.trim().toUpperCase();

    let data : Symbol [];
    let result : string [];
    
    data = JSON.parse(localStorage.getItem(LocalStorageDataName));

    for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) {

      if ( data[symbolIndex].symbol == symbol) {
        result = data[symbolIndex].news;
        break;
      }
    }

    return result;    
  }

  clearStorage () {
    if (!this.storageEnabled) 
      return; // Storage is not supported.  
      
    localStorage.clear();
  }

  // Determines if local storage is available.
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  private storageAvailable (type: any) : boolean {

      try {
          var storage = window[type],
              x = '__storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
      }
      catch(e) {
          return e instanceof DOMException && (
              // everything except Firefox
              e.code === 22 ||
              // Firefox
              e.code === 1014 ||
              // test name field too, because code might not be present
              // everything except Firefox
              e.name === 'QuotaExceededError' ||
              // Firefox
              e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
              // acknowledge QuotaExceededError only if there's something already stored
              storage.length !== 0;
      }
  }

  ngOnDestroy() {
    this.symbolSubject.complete();
    this.newsSubject.complete();
    this.symbolSubject.complete();    
  }    
}
