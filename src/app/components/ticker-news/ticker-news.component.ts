import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-ticker-news',
  templateUrl: './ticker-news.component.html',
  styleUrls: ['./ticker-news.component.css']
})
export class TickerNewsComponent implements OnInit {

  constructor(private navigationService : NavigationService, private localStorageService : LocalStorageService) { }

  private allNews : String [];

  ngOnInit() {
    let symbol = this.navigationService.ticker;

    this.allNews = this.localStorageService.getNews(symbol);
  }

}
