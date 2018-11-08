import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerNewsAddComponent } from './ticker-news-add.component';

describe('TickerNewsAddComponent', () => {
  let component: TickerNewsAddComponent;
  let fixture: ComponentFixture<TickerNewsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerNewsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerNewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
