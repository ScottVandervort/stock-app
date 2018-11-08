import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerContainerComponent } from './ticker-container.component';

describe('TickerContainerComponent', () => {
  let component: TickerContainerComponent;
  let fixture: ComponentFixture<TickerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerContainerComponent ]
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
