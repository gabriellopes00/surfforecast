import { AddBeachModel } from '@src/domain/usecases/add-beach'
import { ForecastPoint } from '../../../client/interfaces/forecast'

export interface BeachForecast extends AddBeachModel, ForecastPoint {}
