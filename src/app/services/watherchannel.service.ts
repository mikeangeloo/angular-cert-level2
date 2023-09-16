import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UnitMeasurement } from '../types/wather-channel.types'
import { Observable, map } from 'rxjs'
import { CurrentWeatherInfo } from '../interfaces/current-weather-info.interface'
import { FiveDaysWeatherInfo } from '../interfaces/five-days-weather-info.interface'

@Injectable({
  providedIn: 'root',
})
export class WatherchannelService {
  private readonly API_KEY = '5a4b2d457ecbef9eb2a71e480b947604'
  private readonly WATHER_CHANNEL_BASEURL = 'https://api.openweathermap.org/data/2.5'

  constructor(private httpClient: HttpClient) { }

  public getCurrentWatherZipCode(
    zipCode: number,
    countryCode: string,
    units?: UnitMeasurement
  ): Observable<CurrentWeatherInfo> {
    const params = {
      appid: this.API_KEY,
      zip: `${zipCode},${countryCode.toLocaleLowerCase()}`,
      units: units ? units : 'metric'
    }
    return this.httpClient
      .get(`${this.WATHER_CHANNEL_BASEURL}/weather`, { params })
      .pipe(map((watherData) => watherData as CurrentWeatherInfo))
  }

  public getFiveDayForecast(
    zipCode: number,
    countryCode: string,
    units?: UnitMeasurement
  ): Observable<FiveDaysWeatherInfo> {
    const params = {
      appid: this.API_KEY,
      zip: `${zipCode},${countryCode.toLocaleLowerCase()}`,
      units: units ? units : 'metric',
      cnt: 5,
    }

    return this.httpClient
      .get(`${this.WATHER_CHANNEL_BASEURL}/forecast/daily`, { params })
      .pipe(map((watherData) => watherData as FiveDaysWeatherInfo))
  }
}
