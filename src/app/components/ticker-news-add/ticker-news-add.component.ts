import { Component, OnInit, SecurityContext, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { NavigationService } from '../../services/navigation.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticker-news-add',
  templateUrl: './ticker-news-add.component.html',
  styleUrls: ['./ticker-news-add.component.css']
})
export class TickerNewsAddComponent implements OnInit, OnDestroy {

  public allTickerNews : String [] = [];

  public addedNews : string;

  addNewsSubscription : Subscription;

  constructor( private localStorageService: LocalStorageService,  private navigationService : NavigationService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // Get all news for the stock ticker currently being perused by the user ...
    this.allTickerNews = this.localStorageService.getNews(this.navigationService.ticker);

    // Subscribe to "add news" changes to the users' portfolio ...
    this.addNewsSubscription = this.localStorageService.watchNews().subscribe( news => {    
      // ... if the news is for the stock symbol being viewed by the user ...
      if (news.symbol == this.navigationService.ticker) {
        // ... add it.
        this.allTickerNews.push( news.news );
      }
    });
  }

  ngOnDestroy() {
    this.addNewsSubscription.unsubscribe();
  }

  onSubmit() {    
    this.localStorageService.addNews(this.navigationService.ticker,this.addedNews);
  }
}
