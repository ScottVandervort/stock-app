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

  newsSubscription : Subscription;

  constructor( private localStorageService: LocalStorageService,  private navigationService : NavigationService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // Get all news for the stock ticker currently being perused by the user ...
    this.allTickerNews = this.localStorageService.getNews(this.navigationService.ticker);

    // Subscribe to changes to the users' portfolio ...
    this.newsSubscription = this.localStorageService.watchNews().subscribe( msg => {   
      // News is being added ...
      if ((msg.isAdded) && (msg.obj.symbol == this.navigationService.ticker)) {
        this.allTickerNews.push( msg.obj.news );
      }
    });
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

  onSubmit() {    
    this.localStorageService.addNews(this.navigationService.ticker,this.addedNews);
  }
}
