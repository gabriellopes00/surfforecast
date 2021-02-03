import { Authenticator } from '@src/domain/usecases/users/authentication'
import { Validation } from '@src/implementation/validation/interfaces/validation'
import { AuthenticationModel } from '@src/domain/models/user'
import { badRequest, ok, serverError, unauthorized } from '../helpers/http/http'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import { Controller } from '../interfaces/controller'
import logger from '@src/config/logger'

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authenticator: Authenticator
  ) {}

  async handle(
    httpRequest: HttpRequest<AuthenticationModel>
  ): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const accessToken = await this.authenticator.authenticate(
        httpRequest.body
      )
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
