import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { TickerContainerComponent } from './components/ticker-container/ticker-container.component';
import { TickerNewsAddComponent } from './components/ticker-news-add/ticker-news-add.component';
import { TickerAddComponent } from './components/ticker-add/ticker-add.component';
import { TickerDetailsComponent } from './components/ticker-details/ticker-details.component';
import { TickerChartComponent } from './components/ticker-chart/ticker-chart.component';
import { TickerNewsComponent } from './components/ticker-news/ticker-news.component';


import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [
        AppComponent,
        TickerComponent,
        TickerContainerComponent,
        TickerNewsAddComponent,
        TickerAddComponent,
        TickerDetailsComponent,
        TickerChartComponent,
        TickerNewsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "stock-app"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('stock-app');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to stock-app!');
  // });
});
