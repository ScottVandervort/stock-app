import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TickerAddComponent } from '../../components/ticker-add/ticker-add.component';
import { TickerNewsAddComponent } from '../../components/ticker-news-add/ticker-news-add.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isCollapsed: boolean = true;

  constructor(public navigationService: NavigationService, private modalService: NgbModal) {}

  public goHome () {
    this.navigationService.setTicker(null);
  }

  public showTickerNewsAddDialog () {

    let component = TickerNewsAddComponent;

    this.modalService.open(
      component, 
      { ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
        // Nothing to do : Dialog "closed" handler ...
        console.info("TickerAddComponent dialog dismissed!");      
      }, (reason) => {
        // Nothing to do : Dialog "dismissed" handler ...
        console.info("TickerAddComponent dialog closed!");
      });    
  }

  public showTickerAddDialog () {

    let component = TickerAddComponent;

    this.modalService.open(
      component, 
      { ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
        // Nothing to do : Dialog "closed" handler ...
        console.info("TickerAddComponent dialog dismissed!");      
      }, (reason) => {
        // Nothing to do : Dialog "dismissed" handler ...
        console.info("TickerAddComponent dialog closed!");
      });    
  }
  
  ngOnInit() {}
}
