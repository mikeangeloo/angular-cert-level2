import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationZipcodeComponent } from './location-zipcode.component';

describe('LocationZipcodeComponent', () => {
  let component: LocationZipcodeComponent;
  let fixture: ComponentFixture<LocationZipcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationZipcodeComponent]
    });
    fixture = TestBed.createComponent(LocationZipcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
