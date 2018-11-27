import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { HistoricalQuote } from 'src/app/models/historical-quote';
import { TickerService } from '../../services/ticker.service';
import { NavigationService } from '../../services/navigation.service';

const DateFormat="%Y-%m-%d";
const ChartEl : string ="#chart";
const ChartWidth : number = 600;
const ChartHeight : number = 400;

@Component({
  encapsulation: ViewEncapsulation.None,  
  selector: 'app-ticker-chart',
  templateUrl: './ticker-chart.component.html',
  styleUrls: ['./ticker-chart.component.css']
})
export class TickerChartComponent implements OnInit {

  constructor(private tickerService : TickerService, private navigationService : NavigationService) { }

  ngOnInit() {

    // Give the user something to look at for now ...
    this.showChart([]);

    this.tickerService.getHistoricalQuote(this.navigationService.ticker).subscribe( res => {      
      this.showChart(res);
    })
  }

  private showChart( historicalQuotes : HistoricalQuote[] ) {

    var data = [];    

    // D3.js doesn't "like" strongly-typed data so let's transform the historical quotes back into a POJO
    // Plain-Old-JSON-Object to avoid a lot of heartbreak ...
    // 
    //
  	//  [	{ date: "1998-02-27", close: "84.7500" },
    //	  { date: "1998-03-31", close: "89.5000" },
    //	  ...
		//  ]	
    historicalQuotes.forEach( historicalQuote => {
      data.push({"date" : historicalQuote.date, "close" : historicalQuote.price });
    })

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = ChartWidth - margin.left - margin.right,
        height = ChartHeight - margin.top - margin.bottom;
  
    // parse the date / time
    var parseTime = d3.timeParse(DateFormat);
  
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
  
    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d["date"]); })
        .y(function(d) { return y(d["close"]); });
  
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(ChartEl).html("").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
  
      // format the data
      data.forEach(function(d) {
          d.date = parseTime(d.date);
          d.close = +d.close;
      });
  
      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([0, d3.max(data, function(d) { return d.close; })]);
  
      // Add the valueline path.
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", valueline);
  
      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
  
      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));
  
  }

}
