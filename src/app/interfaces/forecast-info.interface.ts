export interface ForecastInfo {
  zipCode: number
  countryCode: string
  place?: string
  conditions?: string
  currentTemp?: number
  maxTemp: number
  minTemp: number
  image: string
  date?: string
}
