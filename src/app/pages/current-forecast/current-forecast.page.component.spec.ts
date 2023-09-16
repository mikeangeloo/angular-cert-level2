import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentForecastPageComponent } from './current-forecast.page.component';

describe('HomePageComponent', () => {
  let component: CurrentForecastPageComponent;
  let fixture: ComponentFixture<CurrentForecastPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentForecastPageComponent]
    });
    fixture = TestBed.createComponent(CurrentForecastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
