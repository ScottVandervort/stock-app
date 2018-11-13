import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  isAddNewsVisible : boolean = false;
  ticker : string = null;

  constructor() {}

  toggleAddNewsNavItem( show : boolean ) {
    this.isAddNewsVisible = show;
  } 

  setTicker( ticker: string) {
    this.ticker = ticker;
  }
}
