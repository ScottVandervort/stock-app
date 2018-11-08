import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  showDetails : boolean;

  constructor(private route: ActivatedRoute) { 
    this.showDetails = false;
  }

  ngOnInit() {

    this.showDetails = (typeof this.route.snapshot.params['id'] != 'undefined');
  }

}
