import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Required for AJAX ( fetches ).

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TickerChartComponent } from './components/ticker-chart/ticker-chart.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { TickerNewsComponent } from './components/ticker-news/ticker-news.component';
import { TickerAddComponent } from './components/ticker-add/ticker-add.component';
import { TickerDetailsComponent } from './components/ticker-details/ticker-details.component';
import { TickerNewsAddComponent } from './components/ticker-news-add/ticker-news-add.component';
import { TickerContainerComponent } from './components/ticker-container/ticker-container.component';



@NgModule({
  declarations: [
    AppComponent,
    TickerChartComponent,
    TickerComponent,
    TickerNewsComponent,
    TickerAddComponent,
    TickerDetailsComponent,
    TickerNewsAddComponent,
    TickerContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
