import { Component, Input, OnInit } from '@angular/core'
import { FiveDaysWeatherInfo } from 'src/app/interfaces/five-days-weather-info.interface'
import { ForecastInfo } from 'src/app/interfaces/forecast-info.interface'
import { WatherchannelService } from 'src/app/services/watherchannel.service'
import { DateConversion } from '../utils/date-conversion'
import { Router } from '@angular/router'

@Component({
  selector: 'app-full-forecast',
  templateUrl: './full-forecast.component.html',
  styleUrls: ['./full-forecast.component.scss'],
})
export class FullForecastComponent implements OnInit {
  @Input() zipCode: number = 0
  @Input() countryCode: string = 'MX'

  public forecastInfo: ForecastInfo[] = []

  public placeName: string = ''

  constructor(private weatherService: WatherchannelService, private router: Router) { }

  ngOnInit(): void {
    this.fetchForecastInfo()
  }

  fetchForecastInfo(): void {
    this.weatherService
      .getFiveDayForecast(this.zipCode, this.countryCode, 'metric')
      .subscribe((data: FiveDaysWeatherInfo) => {
        this.placeName = data.city.name
        this.forecastInfo = data.list.map((info) => {
          const forecastInfo: ForecastInfo = {
            zipCode: this.zipCode,
            countryCode: this.countryCode,
            date: DateConversion.formatDate(info.dt, 'short'),
            maxTemp: info.temp.max,
            minTemp: info.temp.min,
            conditions: info.weather[0].main,
            image: info.weather[0].main ? info.weather[0].main.toLowerCase() + '.png' : '',
          }
          return forecastInfo
        })
      })
  }

  public returnHomePage(): void {
    this.router.navigateByUrl('/home')
  }
}
