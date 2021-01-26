import { Controller, Get } from '@overnightjs/core'
import { Beach } from '@src/infra/db/beaches/models/beach'
import { ForecastService } from '@src/services/forecast/forecast-service'
import { Request, Response } from 'express'

const forecast = new ForecastService()

@Controller('forecast')
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    const beaches = await Beach.find({})
    const forecastData = await forecast.processForecastForBeaches(beaches)
    res.status(200).send(forecastData)
  }
}
