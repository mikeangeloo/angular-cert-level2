import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { ForecastInfo } from '../../interfaces/forecast-info.interface'
import { ForecastService } from '../../services/forecast.service'

@Component({
  selector: 'app-single-forecast',
  templateUrl: './single-forecast.component.html',
  styleUrls: ['./single-forecast.component.scss'],
})
export class SingleForecastComponent implements OnInit {
  constructor(
    public forecastService: ForecastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forecastService.loadSavedLocalForecastInfo()
  }

  public removeForecastLocation(forecastLocation: ForecastInfo): void {
    this.forecastService.removeLocationForecast(forecastLocation)
  }

  public goTo(forecatsInfo: ForecastInfo): void {
    this.router.navigate(['/forecast'], {
      queryParams: {
        zipCode: forecatsInfo.zipCode,
        countryCode: forecatsInfo.countryCode
      }
    })
  }
}
