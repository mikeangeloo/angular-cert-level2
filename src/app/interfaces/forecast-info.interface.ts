export interface ForecastInfo {
  zipCode: number
  countryCode: string
  place?: string
  conditions: string
  conditionApiIcon: string
  currentTemp?: number
  maxTemp: number
  minTemp: number
  date?: string
}
