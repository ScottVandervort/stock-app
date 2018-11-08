import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerDetailsComponent } from './ticker-details.component';

describe('TickerDetailsComponent', () => {
  let component: TickerDetailsComponent;
  let fixture: ComponentFixture<TickerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
