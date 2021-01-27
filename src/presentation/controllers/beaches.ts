import { Controller, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { AddBeach } from '@src/domain/usecases/beaches/add-beach'

@Controller('beach')
export class BeachController {
  constructor(private readonly addBeach: AddBeach) {}

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.addBeach.add(req.body)
      res.status(201).send(result)
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ error: error.message })
      } else res.status(500).send({ error: 'Internal server error' })
    }
  }
}
