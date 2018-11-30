import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticker-news',
  templateUrl: './ticker-news.component.html',
  styleUrls: ['./ticker-news.component.css']
})
export class TickerNewsComponent implements OnInit, OnDestroy {

  public allNews : String [] = [];
  private addNewsSubscription : Subscription;

  constructor(private navigationService : NavigationService, private localStorageService : LocalStorageService) { }

  ngOnInit() {

    // Get the stock symbol currently bieng perused by the user ...
    let symbol = this.navigationService.ticker;
    /// ... and get news for it.
    this.allNews = this.localStorageService.getNews(symbol);

    // Subscribe to "add news" changes to the users' portfolio ...
    this.addNewsSubscription = this.localStorageService.watchNews().subscribe( news => {
      // ... if the news is for the stock symbol being viewed by the user ...
      if (news.symbol == this.navigationService.ticker) {
        // ... add it.
        this.allNews.push( news.news );
      }
    });
  }

  ngOnDestroy() {
    this.addNewsSubscription.unsubscribe();
  }

}
