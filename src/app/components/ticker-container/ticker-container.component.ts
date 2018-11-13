import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-ticker-container',
  templateUrl: './ticker-container.component.html',
  styleUrls: ['./ticker-container.component.css']
})
export class TickerContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private navigationService: NavigationService) {}

  ngOnInit() {

    if (typeof this.route.snapshot.params['id'] != 'undefined') {
      this.navigationService.toggleAddNewsNavItem(true);
      this.navigationService.setTicker( this.route.snapshot.params['id']);
    }
    else {
      this.navigationService.toggleAddNewsNavItem(false);
      this.navigationService.setTicker(null);
    }
  }

}
