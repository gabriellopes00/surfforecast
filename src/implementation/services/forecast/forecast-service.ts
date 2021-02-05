import { ForecastPoint } from '@src/domain/models/forecast'
import { StormGlassClient } from '@src/presentation/client/storm-glass'
import { ForecastInternalProcessingError } from './errors/internal-processing-error'
import { BeachModel } from '@src/domain/models/beach'
import { BeachForecast, TimeForecast } from '@src/domain/models/forecast'
import { AddBeachModel } from '@src/domain/usecases/beaches/add-beach'
import { ProcessForecast } from '@src/domain/usecases/forecast/process-forecast'
import { RatingService } from '../rating/rating-service'
import _ from 'lodash'

export class ForecastService implements ProcessForecast {
  constructor(
    protected readonly stormGlass = new StormGlassClient(),
    protected readonly ratingService: typeof RatingService = RatingService
  ) {}

  public async processByBeaches(
    beaches: BeachModel[]
  ): Promise<TimeForecast[]> {
    try {
      const pointsSources = await this.calculateRating(beaches)
      const timeForecast = this.mapForecastByTime(pointsSources)
      return timeForecast.map(timeForecast => ({
        time: timeForecast.time,
        forecast: _.orderBy(timeForecast.forecast, ['rating'], 'desc')
      }))
    } catch (error) {
      throw new ForecastInternalProcessingError(error.message)
    }
  }

  private async calculateRating(
    beaches: BeachModel[]
  ): Promise<BeachForecast[]> {
    const pointsSources: BeachForecast[] = []

    for (const beach of beaches) {
      const rating = new RatingService(beach)
      const points: ForecastPoint[] = await this.stormGlass.fetchPoints(
        beach.lat,
        beach.lng
      )
      const enrichedData = this.enrichedData(points, beach, rating)
      pointsSources.push(...enrichedData)
    }

    return pointsSources
  }

  private enrichedData(
    points: ForecastPoint[],
    beach: AddBeachModel,
    rating: RatingService
  ): BeachForecast[] {
    return points.map(point => ({
      ...{
        lat: beach.lat,
        lng: beach.lng,
        name: beach.name,
        position: beach.position,
        rating: rating.getPointRating(point)
      },
      ...point
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
