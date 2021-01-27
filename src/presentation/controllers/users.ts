import { Controller, Post } from '@overnightjs/core'
import { AddUser } from '@src/domain/usecases/users/add-user'
import { Response, Request } from 'express'

@Controller('users')
export class UsersController {
  constructor(private readonly addUser: AddUser) {}

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const result = await this.addUser.add(req.body)
    res.status(201).send(result)
  }
}
