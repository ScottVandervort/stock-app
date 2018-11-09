import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Need to import ( here and below ) all of the Components nested within this Component.
import { TickerContainerComponent } from './ticker-container.component';
import { TickerDetailsComponent } from '../ticker-details/ticker-details.component';
import { TickerChartComponent } from '../ticker-chart/ticker-chart.component';
import { TickerNewsComponent } from '../ticker-news/ticker-news.component';

describe('TickerContainerComponent', () => {
  let component: TickerContainerComponent;
  let fixture: ComponentFixture<TickerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TickerContainerComponent,
        TickerDetailsComponent,
        TickerChartComponent,
        TickerNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
