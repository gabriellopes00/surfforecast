// import { Controller, Post } from '@overnightjs/core'
import { AddUser } from '../../domain/usecases/users/add-user'
import { compare, generateToken, User } from '../../infra/db/users/user-model'
import { Response, Request } from 'express'
import { Validation } from '../../implementation/validation/interfaces/validation'
import { badRequest, forbidden, ok, serverError } from '../helpers/http/http'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use'

// @Controller('users')
export class UsersController {
  constructor(
    private readonly addUser: AddUser,
    private readonly validator: Validation
  ) {}

  // @Post('')
  public async handle(req: Request, res: Response) {
    try {
      const error = this.validator.validate(req.body)
      if (error) return badRequest(error)

      const { name, email, password } = req.body
      const user = await this.addUser.add({ name, email, password })
      if (!user) return forbidden(new EmailAlreadyInUseError())

      delete user.password
      return ok({ data: user })
    } catch (error) {
      return serverError(error)
    }
  }

  // @Post('auth')
  public async authenticate(req: Request, res: Response): Promise<Response> {
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

    return res.send({ ...user.toJSON(), ...{ token } })
  }
}
