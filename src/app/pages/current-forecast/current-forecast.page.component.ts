import { Component } from '@angular/core';
import { ForecastService, LocationForecast } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-current-forecast.page',
  templateUrl: './current-forecast.page.component.html',
  styleUrls: ['./current-forecast.page.component.scss']
})
export class CurrentForecastPageComponent {

  constructor(
    private forecastService: ForecastService
  ) { }

  public handleEnteredLocation(enteredLocation: LocationForecast) {
    console.log(enteredLocation)

    this.forecastService.saveLocationForecast(enteredLocation)


  }
}
