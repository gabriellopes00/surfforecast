import { Controller, Post } from '@overnightjs/core'
import { AddUser } from '@src/domain/usecases/users/add-user'
import { Validation } from '@src/implementation/interfaces/validation/validation'
import { compare, generateToken, User } from '@src/infra/db/users/user-model'
import { Response, Request } from 'express'
import { BaseController } from './index'

@Controller('users')
export class UsersController extends BaseController {
  constructor(
    private readonly addUser: AddUser,
    private readonly validation: Validation
  ) {
    super()
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.addUser.add(req.body)
      res.status(201).send(result)
    } catch (error) {
      this.sendResponseError(res, error)
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
