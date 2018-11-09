import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// Import RouterTestingModule here ( and in Testbed below ) if Component html implements <router-outlet>
import { RouterTestingModule } from '@angular/router/testing'; 

import { TickerComponent } from './ticker.component';

describe('TickerComponent', () => {
  let component: TickerComponent;
  let fixture: ComponentFixture<TickerComponent>;

  beforeEach(async(() => {    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ TickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
