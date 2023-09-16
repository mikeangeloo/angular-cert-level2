import { Component, Input, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { ForecastInfo } from 'src/app/interfaces/forecast-info.interface'
import { ForecastService, LocationForecast } from 'src/app/services/forecast.service'

@Component({
  selector: 'app-single-forecast',
  templateUrl: './single-forecast.component.html',
  styleUrls: ['./single-forecast.component.scss'],
})
export class SingleForecastComponent implements OnInit {
  @Input() forecatsInfo$: Observable<ForecastInfo> = of()

  constructor(
    public forecastService: ForecastService
  ) { }

  ngOnInit(): void {
    this.forecastService.loadSavedLocalForecastInfo()
  }


  public removeForecastLocation(forecastLocation: ForecastInfo): void {
    this.forecastService.removeLocationForecast(forecastLocation)
  }

}
