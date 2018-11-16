import { Injectable } from '@angular/core';
import { Symbol } from '../models/symbol';

const LocalStorageDataName : string = 'stock-app-data';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  storageEnabled : boolean = false;

  constructor() { 
    this.storageEnabled = this.storageAvailable('localStorage');
  }

  addSymbol ( symbol: string ) {

    // TODO : Validate symbol against service.
    // TODO : HTMLEnode / Scrub service.
    // TODO : Sort symbols prior to storing?

    if ((typeof symbol == 'undefined') || (symbol == null) || symbol.trim() == '')
      return; // Symbol is invalid. Throw exception?

    if (!this.storageEnabled) 
      return; // Storage is not supported. Throw exception?

    let data : Symbol [];

    symbol = symbol.trim().toUpperCase();

    data = JSON.parse(localStorage.getItem(LocalStorageDataName)) || [];

    if (data!= null) 
      for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) {
        if (data[symbolIndex].symbol.toUpperCase().trim() == symbol) 
          return; // Ticker Symbol already exists. Throw exception?
      }

    data.push ( new Symbol(symbol, []) )

    localStorage.setItem(LocalStorageDataName, JSON.stringify(data));
  }

  addNews ( symbol: string, news: string )  {

    // TODO : Validate symbol against service.
    // TODO : HTMLEnode / Scrub service.

    if ((typeof symbol == 'undefined') || (symbol == null) || symbol.trim() == '')
      return; // Symbol is invalid. Throw exception?

    if ((typeof symbol == 'undefined') || (news == null) || news.trim() == '')
    return; // News is invalid. Throw exception?
      
    if (!this.storageEnabled) 
      return; // Storage is not supported. Throw exception?

    let data : Symbol [] = [];

    symbol = symbol.trim().toUpperCase();

    data = JSON.parse(localStorage.getItem(LocalStorageDataName)) || [];

    if (data!= null)     
    for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) {
      if (data[symbolIndex].symbol.toUpperCase().trim() == symbol)  {
        data[symbolIndex].news.push(news);
        break;
      }       
    }
  }  

  getSymbols () : string[] {

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



  getNews ( symbol: string ) : String [] {

    if ((typeof symbol == 'undefined') || (symbol == null) || symbol.trim() == '')
      return []; // Symbol is invalid. Throw exception?

    if (!this.storageEnabled) 
      return; // Storage is not supported. Throw exception?    

    let data : Symbol [];
    let result : String [];
    
    data = JSON.parse(localStorage.getItem(LocalStorageDataName));

    for (let symbolIndex=0;symbolIndex<data.length;symbolIndex++) 
      if ( data[symbolIndex].symbol == symbol) {
        result = data[symbolIndex].news;
        break;
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
}
