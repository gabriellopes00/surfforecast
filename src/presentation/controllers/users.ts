import { Controller, Post } from '@overnightjs/core'
import { AddUser } from '@src/domain/usecases/users/add-user'
import { compare, generateToken, User } from '../../infra/db/users/user-model'
import { Response, Request } from 'express'
import { Validation } from '@src/implementation/validation/interfaces/validation'
import { badRequest } from '../helpers/http/http'

@Controller('users')
export class UsersController {
  constructor(
    private readonly addUser: AddUser,
    private readonly validator: Validation
  ) {}

  @Post('')
  public async create(req: Request, res: Response) {
    try {
      const error = this.validator.validate(req.body)
      if (error) return badRequest(error)

      const result = await this.addUser.add(req.body)
      res.status(201).send(result)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  @Post('auth')
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
