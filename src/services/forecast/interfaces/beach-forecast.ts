import { ForecastPoint } from '../../../client/interfaces/forecast'
import { BeachModel } from '../../../domain/models/beach'

export interface BeachForecast
  extends Omit<BeachModel, 'user'>,
    ForecastPoint {}
