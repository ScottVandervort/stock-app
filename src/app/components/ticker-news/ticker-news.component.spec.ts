import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerNewsComponent } from './ticker-news.component';

describe('TickerNewsComponent', () => {
  let component: TickerNewsComponent;
  let fixture: ComponentFixture<TickerNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
