import { Controller, Post } from '@overnightjs/core'
import { AddUser } from '@src/domain/usecases/users/add-user'
import { Validation } from '@src/implementation/interfaces/validation/validation'
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
}
