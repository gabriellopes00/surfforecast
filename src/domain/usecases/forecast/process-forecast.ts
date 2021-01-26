import { BeachModel } from '../../models/beach'
import { TimeForecast } from '../../models/forecast'

export interface ProcessForecast {
  processByBeaches(beaches: BeachModel[]): Promise<TimeForecast[]>
}
