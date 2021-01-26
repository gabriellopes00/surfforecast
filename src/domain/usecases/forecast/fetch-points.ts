import { ForecastPoint } from '@src/domain/models/forecast'

export interface ForecastClient {
  fetchPoints(lat: number, lng: number): Promise<ForecastPoint[]>
}
