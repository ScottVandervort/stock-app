import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  isAddNewsVisible : boolean = false;
  ticker : string = null;

  constructor() {}

  setTicker( ticker: string) {
    this.ticker = ticker;
    this.isAddNewsVisible = !(typeof ticker == 'undefined' || ticker == null);
  }
}
