import { HttpRequest, HttpResponse } from '../interfaces/http'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
