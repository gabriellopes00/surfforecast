import { AxiosStatic } from 'axios'

export class StormGlassClient {
  private readonly stormGlassAPIParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed'
  private readonly stormGlassAPISource = 'noaaa'

  constructor(protected request: AxiosStatic) {}

  public async fetchPoints(latitude: number, longitude: number): Promise<any> {
    const response = await this.request.get(
      `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${latitude}&lng=${longitude}`
    )
    return response
  }
}
