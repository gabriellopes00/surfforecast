import { ClassMiddleware, Controller, Get } from '@overnightjs/core'
import { Beach } from '../../infra/db/beaches/beach-model'
import { ForecastService } from '../../implementation/services/forecast/forecast-service'
import { Request, Response } from 'express'
import { AuthMiddleware } from '../middlewares/auth'

const forecast = new ForecastService()

@Controller('forecast')
@ClassMiddleware(AuthMiddleware)
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({ user: req.decoded.id })
      const forecastData = await forecast.processByBeaches(beaches)
      res.status(200).send(forecastData)
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong' })
    }
  }
}
