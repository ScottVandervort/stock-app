import { Component, OnInit, SecurityContext } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { NavigationService } from '../../services/navigation.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ticker-news-add',
  templateUrl: './ticker-news-add.component.html',
  styleUrls: ['./ticker-news-add.component.css']
})
export class TickerNewsAddComponent implements OnInit {

  private allTickerNews : String [] = [];

  private addedNews : string;

  constructor( private localStorageService: LocalStorageService,  private navigationService : NavigationService, private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.allTickerNews = this.localStorageService.getNews(this.navigationService.ticker);
  }

  onSubmit() {    
    let val = this.sanitizer.sanitize(SecurityContext.HTML,this.addedNews);

    this.localStorageService.addNews(this.navigationService.ticker,this.addedNews);
    this.allTickerNews = this.localStorageService.getNews(this.navigationService.ticker);
  }
}
