import mongoose from 'mongoose'
import { AddBeach } from '@src/domain/usecases/beaches/add-beach'
import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import { created, serverError } from '../helpers/http/http'

export class BeachController implements Controller {
  constructor(private readonly addBeach: AddBeach) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      console.log(httpRequest)
      const result = await this.addBeach.add({
        ...httpRequest.body,
        user: httpRequest.decoded
      })
      return created(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
