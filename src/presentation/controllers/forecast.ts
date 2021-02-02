import { Beach } from '@src/infra/db/beaches/beach-model'
import { ForecastService } from '@src/implementation/services/forecast/forecast-service'
import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import { ok, serverError, unauthorized } from '../helpers/http/http'
import { Decrypter } from '@src/implementation/interfaces/cryptography/decrypter'

const forecast = new ForecastService()

export class ForecastController implements Controller {
  constructor(private readonly decrypter: Decrypter) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userData = await this.decrypter.decrypt(
        httpRequest.headers['access-token']
      )
      if (!userData) return unauthorized()

      const beaches = await Beach.find({ user: userData.id })
      const forecastData = await forecast.processByBeaches(beaches)
      return ok(forecastData)
    } catch (error) {
      return serverError(error)
    }
  }
}
