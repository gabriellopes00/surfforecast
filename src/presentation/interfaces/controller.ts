import { HttpRequest, HttpResponse } from '../helpers/http/protocols'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
