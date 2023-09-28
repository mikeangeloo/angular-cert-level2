import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forecastImage'
})
export class ForecastImagePipe implements PipeTransform {

  private readonly weatherIconBaseURL = 'https://www.angulartraining.com/images/weather'

  transform(watherCondition: string, iconApi: string): string {
    switch (watherCondition.toLocaleLowerCase()) {
      case 'sun':
        return this.getWeatherIcon('sun')
      case 'snow':
        return this.getWeatherIcon('snow')
      case 'rain':
        return this.getWeatherIcon('rain')
      case 'clouds':
        return this.getWeatherIcon('clouds')
      default:
        return this.getOpenWeatherApiIcon(iconApi)
    }
  }

  private getWeatherIcon(weatherCondition: string) {
    return `${this.weatherIconBaseURL}/${weatherCondition}.png`
  }

  private getOpenWeatherApiIcon(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

}
