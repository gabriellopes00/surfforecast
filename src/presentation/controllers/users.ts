import { AddUser } from '../../domain/usecases/users/add-user'
import { Response, Request } from 'express'
import { Validation } from '../../implementation/validation/interfaces/validation'
import {
  badRequest,
  created,
  forbidden,
  serverError
} from '../helpers/http/http'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use'
import { Controller } from '../interfaces/controller'
import { HttpRequest } from '../interfaces/http'
import { AddUserModel } from '@src/domain/models/user'

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
      if (!user) return forbidden(new EmailAlreadyInUseError())

      delete user.password
      return created({ data: user })
    } catch (error) {
      return serverError(error)
    }
  }

  /* public async authenticate(req: Request, res: Response): Promise<Response> {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).send({
        code: 401,
        error: 'User not found!'
      })
    }
    if (!(await compare(req.body.password, user.password))) {
      return res
        .status(401)
        .send({ code: 401, error: 'Password does not match!' })
    }
    const token = generateToken(user.toJSON())

  }
  return res.send({ ...user.toJSON(), ...{ token } }) */
}
