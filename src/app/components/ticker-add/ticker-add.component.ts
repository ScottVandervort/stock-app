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

  addSymbolSubscription : Subscription;

  constructor( private localStorageService: LocalStorageService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // Get all stock symbols in the user's portfolio...
    this.stockSymbols = this.localStorageService.getSymbols();

    // Subscribe to "add" changes to the users' portfolio ...
    this.addSymbolSubscription = this.localStorageService.watchSymbols().subscribe( symbol => this.stockSymbols.push( symbol ) );
  }

  ngOnDestroy() {
    this.addSymbolSubscription.unsubscribe();
  }

  onSubmit() {    
    this.localStorageService.addSymbol(this.addedSymbol);
  }
}
