import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryCode, ForecastService, LocationForecast } from '../../services/forecast.service';


@Component({
  selector: 'app-location-zipcode',
  templateUrl: './location-zipcode.component.html',
  styleUrls: ['./location-zipcode.component.scss']
})
export class LocationZipcodeComponent implements OnInit {
  @Output() enteredLocation = new EventEmitter<LocationForecast>()

  public countryCodes: CountryCode[] = []

  public selectedZipCode: number | undefined
  public errorFeedback: string | undefined
  private errors: string[] = []

  public selectedContryCode: string = ''

  constructor(
    private forecastService: ForecastService
  ) {

  }

  ngOnInit(): void {
    this.listCountryCodes()
  }

  listCountryCodes(): void {
    this.countryCodes = this.forecastService.getCountryCodes()
  }

  emitEnteredZipCode(): void {
    this.errors = []
    if (!this.selectedZipCode) {
      this.errors.push('You must enter a valid zip code')
    }
    if (!this.selectedContryCode || this.selectedContryCode === '') {
      this.errors.push('You must enter a valid country code')
    }
    if (this.errors.length > 0) {
      this.errorFeedback = this.errors.join(',')
      return
    }
    this.errorFeedback = ''
    this.enteredLocation.emit({
      countryCode: this.selectedContryCode,
      zipCode: this.selectedZipCode as number
    })
    this.selectedZipCode = undefined
    this.selectedContryCode = ''
  }
}
