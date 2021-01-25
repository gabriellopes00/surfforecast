import { ForecastPoint } from '@src/client/interfaces/forecast'
import { StormGlassClient } from '../../client/storm-glass'

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

export class ForecastService {
  constructor(protected readonly stormGlass = new StormGlassClient()) {}

  public async processForecastForBeaches(
    beaches: Beach[]
  ): Promise<BeachForecast[]> {
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
      return pointsSources
    }
  }
}
