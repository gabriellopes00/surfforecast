import { Beach } from '../../infra/db/beaches/beach-model'
import { ForecastService } from '../../implementation/services/forecast/forecast-service'
import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import { ok, serverError } from '../helpers/http/http'
import { secretKey } from '../../config/env'
import jwt from 'jsonwebtoken'

const forecast = new ForecastService()

export class ForecastController implements Controller {
  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = jwt.verify(
        httpRequest.headers['access-token'],
        secretKey
      ) as { id: string }
      const beaches = await Beach.find({ user: token.id })
      const forecastData = await forecast.processByBeaches(beaches)
      return ok(forecastData)
    } catch (error) {
      return serverError(error)
    }
  }
}
