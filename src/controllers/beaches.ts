import { Controller, Post } from '@overnightjs/core'
import { Request, Response } from 'express'

@Controller('beach')
export class BeachController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    res.status(201).send({ ...req.body, id: 'fake-id' })
  }
}
