import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import { TickerComponent } from './components/ticker/ticker.component';
import { TickerAddComponent } from './components/ticker-add/ticker-add.component';
import { TickerNewsAddComponent } from './components/ticker-news-add/ticker-news-add.component';
import { TickerContainerComponent } from './components/ticker-container/ticker-container.component';

const appRoutes: Routes = [

  { path: 'quote', component: TickerComponent },
  { path: 'quote/:id', component: TickerComponent,
    children:[
      { path: 'details', component: TickerContainerComponent},       
      { path: 'addNews', component: TickerNewsAddComponent}, 
      { path: 'addSymbol', component: TickerAddComponent},       
    ] },
  { path: '', redirectTo: '/quote', pathMatch: 'full'}
  /* path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  providers: [
    /*  This is required to prevent error, "Please provide a value for the APP_BASE_HREF token or add a base element to the document".
        Go here: https://angular.io/api/common/APP_BASE_HREF for more info. */
    {provide: APP_BASE_HREF, useValue: '/stockapp'}
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}