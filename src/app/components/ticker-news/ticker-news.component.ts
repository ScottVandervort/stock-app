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
  private newsSubscription : Subscription;

  constructor(private navigationService : NavigationService, private localStorageService : LocalStorageService) { }

  ngOnInit() {

    // Get the stock symbol currently bieng perused by the user ...
    let symbol = this.navigationService.ticker;
    /// ... and get news for it.
    this.allNews = this.localStorageService.getNews(symbol);

    // Subscribe to changes to the users' portfolio ...
    this.newsSubscription = this.localStorageService.watchNews().subscribe( msg => {   
      // News is being added ...
      if ((msg.isAdded) && (msg.obj.symbol == this.navigationService.ticker)) {
        this.allNews.push( msg.obj.news );
      }
    });
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

}
