import { AddBeachModel } from '../usecases/beaches/add-beach'

export interface ForecastPoint {
  time: string
  waveHeight: number
  waveDirection: number
  swellDirection: number
  swellHeight: number
  swellPeriod: number
  windDirection: number
  windSpeed: number
}

export interface BeachForecast extends AddBeachModel, ForecastPoint {}

export interface TimeForecast {
  time: string
  forecast: BeachForecast[]
}
