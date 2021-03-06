import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Required for AJAX ( fetches ).
import { FormsModule } from '@angular/forms'; // Required for Forms.

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxLoadingModule, ngxLoadingAnimationTypes} from 'ngx-loading'; // Loading indicator.

import { TickerChartComponent } from './components/ticker-chart/ticker-chart.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { TickerNewsComponent } from './components/ticker-news/ticker-news.component';
import { TickerAddComponent } from './components/ticker-add/ticker-add.component';
import { TickerDetailsComponent } from './components/ticker-details/ticker-details.component';
import { TickerNewsAddComponent } from './components/ticker-news-add/ticker-news-add.component';
import { TickerContainerComponent } from './components/ticker-container/ticker-container.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { interpolateBlues, rgb } from 'd3';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';



@NgModule({
  declarations: [
    AppComponent,
    TickerChartComponent,
    TickerComponent,
    TickerNewsComponent,
    TickerAddComponent,
    TickerDetailsComponent,
    TickerNewsAddComponent,
    TickerContainerComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    /* Loading indicator configuration */
    NgxLoadingModule.forRoot({     
      backdropBackgroundColour: 'rgba(0, 0, 0, 0)',
      primaryColour: 'steelblue',
      animationType: ngxLoadingAnimationTypes.circleSwish
    })
  ],
  providers: [],
  /* Components displayed in dialogs are added here ... */
  entryComponents: [TickerAddComponent, TickerNewsAddComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
