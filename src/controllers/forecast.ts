import { Controller, Get } from '@overnightjs/core'
import { Beach, BeachSchema } from '../infra/db/beaches/models/beach'
import { ForecastService } from '../services/forecast/forecast-service'
import { Request, Response } from 'express'

const forecast = new ForecastService()

@Controller('forecast')
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches: BeachSchema[] = await Beach.find({})
      const forecastData = await forecast.processForecastForBeaches(beaches)
      res.status(200).send(forecastData)
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong' })
    }
  }
}
