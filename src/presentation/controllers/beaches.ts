import { AddBeach } from '@src/domain/usecases/beaches/add-beach'
import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'
import { created, serverError, unauthorized } from '../helpers/http/http'
import { Decrypter } from '@src/implementation/interfaces/cryptography/decrypter'
import { connect } from '@src/infra/db/helpers/mongoose'

export class BeachController implements Controller {
  constructor(
    private readonly addBeach: AddBeach,
    private readonly decrypter: Decrypter
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = await this.decrypter.decrypt(
        httpRequest.headers['access-token']
      )
      if (!token) return unauthorized()

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
