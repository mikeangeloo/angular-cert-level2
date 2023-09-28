import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CountryCode, ForecastService, LocationForecast } from '../../services/forecast.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';

export interface LocationFormI {
  zipCode: FormControl<null | number>;
  location: FormControl<null | string>;
}

@Component({
  selector: 'app-location-zipcode',
  templateUrl: './location-zipcode.component.html',
  styleUrls: ['./location-zipcode.component.scss']
})
export class LocationZipcodeComponent implements OnInit, OnDestroy {
  @Output() enteredLocation = new EventEmitter<LocationForecast>()

  public countryCodes: CountryCode[] = []
  public errorFeedback: string | undefined
  public locationZipcodeFormGroup!: FormGroup<LocationFormI>

  private errors: string[] = []
  private locationFormSub$!: Subject<boolean>

  constructor(
    private forecastService: ForecastService,
    private formBuilder: FormBuilder
  ) {
    this.locationFormSub$ = new Subject()
    this.setLocationForm()
  }

  ngOnInit(): void {
    this.listCountryCodes()
  }

  ngOnDestroy(): void {
    this.locationFormSub$.next(true)
  }

  get formControls(): LocationFormI {
    return this.locationZipcodeFormGroup.controls
  }

  emitEnteredZipCode(): void {

    this.reviewLocationForm()

    if (this.locationZipcodeFormGroup.invalid) {
      this.locationZipcodeFormGroup.markAllAsTouched()
      return
    }



    this.enteredLocation.emit({
      countryCode: this.formControls.location.value as string,
      zipCode: this.formControls.zipCode.value as number
    })
    this.locationZipcodeFormGroup.reset()
    this.formControls.location.patchValue('', { emitEvent: false })
  }

  private listCountryCodes(): void {
    this.countryCodes = this.forecastService.getCountryCodes()
  }

  private setLocationForm(): void {
    this.locationZipcodeFormGroup = this.formBuilder.group({
      zipCode: new FormControl<number | null>(null, [Validators.required]),
      location: new FormControl<string | null>('', [Validators.required]),
    })

    this.locationZipcodeFormGroup.valueChanges.pipe(
      takeUntil(this.locationFormSub$),
      filter((formData) => !!formData.zipCode && !!formData.location)
    ).subscribe(() => {
      this.reviewLocationForm()
    })
  }

  private reviewLocationForm(): void {
    this.errors = []
    if (this.formControls.zipCode.invalid) {
      this.errors.push('You must enter a valid zip code')
    } else if (this.formControls.location.invalid) {
      this.errors.push('You must enter a valid country code')
    }

    if (this.errors.length > 0) {
      this.errorFeedback = this.errors.join(',')
      return
    }
    this.errorFeedback = ''
  }
}
