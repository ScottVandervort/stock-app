import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerAddComponent } from './ticker-add.component';

describe('TickerAddComponent', () => {
  let component: TickerAddComponent;
  let fixture: ComponentFixture<TickerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
