import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-ticker-add',
  templateUrl: './ticker-add.component.html',
  styleUrls: ['./ticker-add.component.css']
})
export class TickerAddComponent implements OnInit {

  stockSymbols : string [] = [];

  addedSymbol : string;

  constructor( private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.stockSymbols = this.localStorageService.getSymbols();
  }

  onSubmit() {    
    // TODO: Add validation.
    this.localStorageService.addSymbol(this.addedSymbol);
    this.stockSymbols = this.localStorageService.getSymbols();
  }
}
