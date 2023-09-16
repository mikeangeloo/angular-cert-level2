import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleForecastComponent } from './single-forecast.component';

describe('SingleForecastComponent', () => {
  let component: SingleForecastComponent;
  let fixture: ComponentFixture<SingleForecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleForecastComponent]
    });
    fixture = TestBed.createComponent(SingleForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
