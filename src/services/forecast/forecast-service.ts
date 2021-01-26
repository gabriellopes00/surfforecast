import { ForecastPoint } from '@src/domain/models/forecast'
import { StormGlassClient } from '../../client/storm-glass'
import { ForecastInternalProcessingError } from './errors/internal-processing-error'
import { BeachModel } from '../../domain/models/beach'
import { BeachForecast, TimeForecast } from '../../domain/models/forecast'
import { AddBeachModel } from '@src/domain/usecases/add-beach'
import { ProcessForecast } from '../../domain/usecases/forecast/process-forecast'

export class ForecastService implements ProcessForecast {
  constructor(protected readonly stormGlass = new StormGlassClient()) {}

  public async processByBeaches(
    beaches: BeachModel[]
  ): Promise<TimeForecast[]> {
    try {
      const pointsSources: BeachForecast[] = []

      for (const beach of beaches) {
        const points: ForecastPoint[] = await this.stormGlass.fetchPoints(
          beach.lat,
          beach.lng
        )
        const enrichedData = this.enrichedData(points, beach)
        pointsSources.push(...enrichedData)
      }
      return this.mapForecastByTime(pointsSources)
    } catch (error) {
      console.log(error)
      throw new ForecastInternalProcessingError(error.message)
    }
  }

  private enrichedData(
    points: ForecastPoint[],
    beach: AddBeachModel
  ): BeachForecast[] {
    return points.map(e => ({
      ...{
        lat: beach.lat,
        lng: beach.lng,
        name: beach.name,
        position: beach.position,
        rating: 1
      },
      ...e
    }))
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
