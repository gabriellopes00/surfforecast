import { AddUser } from '@src/domain/usecases/users/add-user'
import { Validation } from '@src/implementation/validation/interfaces/validation'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use'
import { Controller } from '../interfaces/controller'
import { HttpRequest } from '../interfaces/http'
import { AddUserModel } from '@src/domain/models/user'
import {
  badRequest,
  conflict,
  created,
  serverError
} from '../helpers/http/http'
import logger from '@src/config/logger'

export class UsersController implements Controller {
  constructor(
    private readonly addUser: AddUser,
    private readonly validator: Validation
  ) {}

  public async handle(httpRequest: HttpRequest<AddUserModel>) {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body
      const user = await this.addUser.add({ name, email, password })
      if (!user) return conflict(new EmailAlreadyInUseError())

      delete user.password
      return created({ data: user })
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
