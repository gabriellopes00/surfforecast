import { AddBeach } from '@src/domain/usecases/beaches/add-beach'
import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import { created, serverError, unauthorized } from '../helpers/http/http'
import jwt from 'jsonwebtoken'
import { secretKey } from '../../config/env'

export class BeachController implements Controller {
  constructor(private readonly addBeach: AddBeach) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = jwt.verify(
        httpRequest.headers['access-token'],
        secretKey
      ) as { id: string }
      if (!token.id) return unauthorized()

      const result = await this.addBeach.add({
        ...httpRequest.body,
        user: token.id
      })
      return created(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
