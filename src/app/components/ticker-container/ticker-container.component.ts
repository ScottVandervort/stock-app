import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-ticker-container',
  templateUrl: './ticker-container.component.html',
  styleUrls: ['./ticker-container.component.scss']
})
export class TickerContainerComponent implements OnInit {

  ticker : string;

  constructor(private route: ActivatedRoute, private navigationService: NavigationService) {}

  ngOnInit() {

    if (typeof this.route.snapshot.params['id'] != 'undefined') {
      this.ticker = this.route.snapshot.params['id'];
      this.navigationService.setTicker(this.ticker);

    }
    else {
      this.ticker = null;
      this.navigationService.setTicker(this.ticker);
    }
  }

}
