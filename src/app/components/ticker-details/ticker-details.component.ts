import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote';
import { TickerService } from '../../services/ticker.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-ticker-details',
  templateUrl: './ticker-details.component.html',
  styleUrls: ['./ticker-details.component.css']
})
export class TickerDetailsComponent implements OnInit {

  public quoteDetails : Quote;
  public isLoading : boolean = false;

  constructor(private tickerService : TickerService, private navigationService : NavigationService) { }

  ngOnInit() {
    
    this.isLoading = true;

    this.tickerService.getQuote(this.navigationService.ticker).subscribe( res => {     
      this.quoteDetails = res;
      this.isLoading = false;
    })
  }
}
