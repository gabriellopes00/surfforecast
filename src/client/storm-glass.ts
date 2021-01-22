import { AxiosStatic } from 'axios'
import { env } from '../../config/env'
import { ClientRequestError } from './errors/client-request-error'
import { StormGlassResponseError } from './errors/stormglass-response-error'
import { ForecastPoint } from './interfaces/forecast'
import {
  StormGlassForecastResponse,
  StormGlassPoint
} from './interfaces/stormglass-response'

export class StormGlassClient {
  private readonly stormGlassAPIParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed'
  private readonly stormGlassAPISource = 'noaa'

  constructor(protected request: AxiosStatic) {}

  public async fetchPoints(
    latitude: number,
    longitude: number
  ): Promise<ForecastPoint[]> {
    try {
      const response = await this.request.get<StormGlassForecastResponse>(
        `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${latitude}&lng=${longitude}`,
        {
          headers: {
            Authorization: env.stormGlassToken
          }
        }
      )
      return this.normalizeResponse(response.data)
    } catch (error) {
      if (error.response && error.response.status) {
        throw new StormGlassResponseError(
          `Error: ${JSON.stringify(error.response.data)} Code: ${
            error.response.status
          }`
        )
      }
      throw new ClientRequestError(error.message, 'StormGlass')
    }
  }

  private normalizeResponse(
    points: StormGlassForecastResponse
  ): ForecastPoint[] {
    return points.hours.filter(this.validateResponse.bind(this)).map(point => ({
      swellDirection: point.swellDirection[this.stormGlassAPISource],
      swellHeight: point.swellHeight[this.stormGlassAPISource],
      swellPeriod: point.swellPeriod[this.stormGlassAPISource],
      time: point.time,
      waveDirection: point.waveDirection[this.stormGlassAPISource],
      waveHeight: point.waveHeight[this.stormGlassAPISource],
      windDirection: point.windDirection[this.stormGlassAPISource],
      windSpeed: point.windSpeed[this.stormGlassAPISource]
    }))
  }

  private validateResponse(point: Partial<StormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.swellDirection?.[this.stormGlassAPISource] &&
      point.swellHeight?.[this.stormGlassAPISource] &&
      point.swellPeriod?.[this.stormGlassAPISource] &&
      point.waveDirection?.[this.stormGlassAPISource] &&
      point.waveHeight?.[this.stormGlassAPISource] &&
      point.windDirection?.[this.stormGlassAPISource] &&
      point.windSpeed?.[this.stormGlassAPISource]
    )
  }
}
