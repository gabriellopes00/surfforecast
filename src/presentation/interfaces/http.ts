export interface HttpRequest<T = any, H = any> {
  body?: T
  headers?: H
  decoded?: string
}

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}
