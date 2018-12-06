import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticker-add',
  templateUrl: './ticker-add.component.html',
  styleUrls: ['./ticker-add.component.css']
})
export class TickerAddComponent implements OnInit {

  stockSymbols : string [] = [];

  addedSymbol : string;

  symbolSubscription : Subscription;

  constructor( private localStorageService: LocalStorageService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // Get all stock symbols in the user's portfolio...
    this.stockSymbols = this.localStorageService.getSymbols();

    // Subscribe to changes to the users' portfolio ...
    this.symbolSubscription = this.localStorageService.watchSymbols().subscribe( msg => {

      if (msg.isAdded) {
        // Add a new symbol.
        this.stockSymbols.push( msg.obj ) ;
      }
      else {
        // Remove an existing symbol.
        for (var stockSymbolIndex = this.stockSymbols.length; stockSymbolIndex >=0; stockSymbolIndex--) {
          if (this.stockSymbols[stockSymbolIndex] == msg.obj) {
            this.stockSymbols.splice(stockSymbolIndex,1);
            break;
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.symbolSubscription.unsubscribe();
  }

  onSubmit() {    
    this.localStorageService.addSymbol(this.addedSymbol);
  }
}
