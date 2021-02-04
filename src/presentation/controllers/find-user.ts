import { Controller } from '../interfaces/controller'
import { HttpRequest } from '../interfaces/http'
import { ok, serverError, unauthorized } from '../helpers/http/http'
import { Decrypter } from '@src/implementation/interfaces/cryptography/decrypter'
import { FindUser } from '@src/domain/usecases/users/find-user'
import logger from '@src/config/logger'

export class FindUserController implements Controller {
  constructor(
    private readonly findUser: FindUser,
    private readonly decrypter: Decrypter
  ) {}

  public async handle(httpRequest: HttpRequest) {
    try {
      const userData = await this.decrypter.decrypt(
        httpRequest.headers['access-token']
      )
      if (!userData) return unauthorized()

      const user = await this.findUser.findById(userData.id)
      if (user) {
        delete user.password
        return ok({ id: user.id, name: user.name, email: user.email })
      }
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
