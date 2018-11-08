import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerChartComponent } from './ticker-chart.component';

describe('TickerChartComponent', () => {
  let component: TickerChartComponent;
  let fixture: ComponentFixture<TickerChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
