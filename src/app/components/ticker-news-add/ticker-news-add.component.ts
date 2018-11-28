import { Component, OnInit, SecurityContext } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { NavigationService } from '../../services/navigation.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticker-news-add',
  templateUrl: './ticker-news-add.component.html',
  styleUrls: ['./ticker-news-add.component.css']
})
export class TickerNewsAddComponent implements OnInit {

  public allTickerNews : String [] = [];

  public addedNews : string;

  constructor( private localStorageService: LocalStorageService,  private navigationService : NavigationService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.allTickerNews = this.localStorageService.getNews(this.navigationService.ticker);
  }

  onSubmit() {    

    this.localStorageService.addNews(this.navigationService.ticker,this.addedNews);
    this.allTickerNews = this.localStorageService.getNews(this.navigationService.ticker);
  }
}
