import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullForecastComponent } from './full-forecast.component';

describe('FullForecastComponent', () => {
  let component: FullForecastComponent;
  let fixture: ComponentFixture<FullForecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullForecastComponent]
    });
    fixture = TestBed.createComponent(FullForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
