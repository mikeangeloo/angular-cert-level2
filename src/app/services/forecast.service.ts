import { Injectable } from '@angular/core';
import { WatherchannelService } from './watherchannel.service';
import { ForecastInfo } from '../interfaces/forecast-info.interface';
import { BehaviorSubject, Observable, catchError, forkJoin, map, of, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {

  public forecastInfos$ = new BehaviorSubject<ForecastInfo[]>([])

  private readonly FORECAST_LOCATIONS = 'forecast_locations'

  private defaultCountryCodes: CountryCode[] = [
    {
      code: 'US',
      name: 'United States of America'
    },
    {
      code: 'MX',
      name: 'México'
    }
  ]

  constructor(
    private watherchannelService: WatherchannelService
  ) { }

  public getCountryCodes(): CountryCode[] {
    return this.defaultCountryCodes
  }

  public saveLocationForecast(forecastLocation: LocationForecast) {

    const savedLocations: LocationForecast[] = this.getSavedLocationsForecast()

    if (this.locationAllReadySaved(forecastLocation, savedLocations)) {
      alert('¡¡¡ Alerta: Locación ya registrada !!!')
      return
    }
    savedLocations.push(forecastLocation)

    this.getForecastInfo(forecastLocation).pipe(take(1)).subscribe((data) => {
      this.forecastInfos$.value.push(data)
      localStorage.setItem(this.FORECAST_LOCATIONS, JSON.stringify(savedLocations))
    })
  }

  public removeLocationForecast(forecastLocationEval: ForecastInfo) {
    const savedLocations: LocationForecast[] = this.getSavedLocationsForecast()

    const filteredSavedLocations = savedLocations.filter((forecastLocation) => Number(forecastLocation.zipCode) !== forecastLocationEval.zipCode || forecastLocation.countryCode !== forecastLocationEval.countryCode)

    localStorage.setItem(this.FORECAST_LOCATIONS, JSON.stringify(filteredSavedLocations))

    this.loadSavedLocalForecastInfo()
  }

  public loadSavedLocalForecastInfo() {
    const savedLocations: LocationForecast[] = this.getSavedLocationsForecast()
    if (savedLocations.length > 0) {
      const forecastBatch = forkJoin(Array.from(savedLocations).map((forecastLocation) => {
        return this.getForecastInfo(forecastLocation)
      }))

      forecastBatch.subscribe((data) => {
        this.forecastInfos$.next(data)
        console.log('forecastData', this.forecastInfos$.value)
      })
    }
  }

  public getForecastInfo(forecastLocation: LocationForecast): Observable<ForecastInfo> {
    return this.watherchannelService.getCurrentWatherZipCode(forecastLocation.zipCode, forecastLocation.countryCode).pipe(
      map((currentWeatherInfo) => {
        const forecastInfo: ForecastInfo = {
          zipCode: forecastLocation.zipCode,
          countryCode: forecastLocation.countryCode,
          place: currentWeatherInfo.name,
          conditions: currentWeatherInfo.weather[0].main,
          currentTemp: currentWeatherInfo.main.temp,
          maxTemp: currentWeatherInfo.main.temp_max,
          minTemp: currentWeatherInfo.main.temp_min,
          image: currentWeatherInfo.weather[0].main ? currentWeatherInfo.weather[0].main.toLowerCase() + '.png' : '',
          date: ''
        }

        return forecastInfo
      }),
      catchError((err: HttpErrorResponse) => {
        alert(err.error.message)
        this.removeLocationForecast(forecastLocation as ForecastInfo)
        throw err
      })
    )
  }

  private getSavedLocationsForecast(): LocationForecast[] {
    return JSON.parse(localStorage.getItem(this.FORECAST_LOCATIONS) ?? '[]')
  }

  private locationAllReadySaved(forecastLocationCompare: LocationForecast, savedForecastLocations: LocationForecast[]): boolean {
    return savedForecastLocations.findIndex((forecast) => {
      return Number(forecast.zipCode) === forecastLocationCompare.zipCode && forecast.countryCode === forecastLocationCompare.countryCode
    }) !== -1
  }
}


export interface CountryCode {
  code: string,
  name: string
}

export interface LocationForecast {
  countryCode: string,
  zipCode: number
}
