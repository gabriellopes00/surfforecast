import { ForecastPoint } from '@src/client/interfaces/forecast'
import { StormGlassClient } from '../../client/storm-glass'
import { ForecastInternalProcessingError } from './errors/internal-processing-error'

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N'
}

export interface Beach {
  lat: number
  lng: number
  position: BeachPosition
  user: string
  name: string
}

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}

export interface TimeForecast {
  time: string
  forecast: BeachForecast[]
}

export class ForecastService {
  constructor(protected readonly stormGlass = new StormGlassClient()) {}

  public async processForecastForBeaches(
    beaches: Beach[]
  ): Promise<TimeForecast[]> {
    try {
      const pointsSources: BeachForecast[] = []

      for (const beach of beaches) {
        const points: ForecastPoint[] = await this.stormGlass.fetchPoints(
          beach.lat,
          beach.lng
        )
        const enrichedData = points.map(e => ({
          ...{
            lat: beach.lat,
            lng: beach.lng,
            name: beach.name,
            position: beach.position,
            rating: 1
          },
          ...e
        }))
        pointsSources.push(...enrichedData)
        return this.mapForecastByTime(pointsSources)
      }
    } catch (error) {
      throw new ForecastInternalProcessingError(error.message)
    }
  }

  private mapForecastByTime(forecast: BeachForecast[]): TimeForecast[] {
    const forecastByTime: TimeForecast[] = []
    for (const point of forecast) {
      const timePoint = forecastByTime.find(f => f.time === point.time)
      if (timePoint) timePoint.forecast.push(point)
      else forecastByTime.push({ time: point.time, forecast: [point] })
    }

    return forecastByTime
  }
}
