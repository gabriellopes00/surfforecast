import { ForecastPoint } from '@src/client/interfaces/forecast'
import { Beach } from './beach'

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}
