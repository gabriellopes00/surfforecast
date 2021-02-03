import { Decrypter } from '@src/implementation/interfaces/cryptography/decrypter'
import { Validation } from '@src/implementation/validation/interfaces/validation'
import { AddBeach } from '@src/domain/usecases/beaches/add-beach'
import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import {
  badRequest,
  created,
  serverError,
  unauthorized
} from '../helpers/http/http'
import logger from '@src/config/logger'

export class BeachController implements Controller {
  constructor(
    private readonly addBeach: AddBeach,
    private readonly decrypter: Decrypter,
    private readonly validator: Validation
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = await this.decrypter.decrypt(
        httpRequest.headers['access-token']
      )
      if (!token) return unauthorized()

      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)

      const result = await this.addBeach.add({
        ...httpRequest.body,
        user: token.id
      })
      return created(result)
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
