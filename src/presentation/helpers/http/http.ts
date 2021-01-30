import { UnauthorizedError } from '../../errors/unauthorized'
import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../../interfaces/http'

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(error.message, error.stack)
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: 403,
  body: error
})

export const conflict = (error: Error): HttpResponse<Error> => ({
  statusCode: 409,
  body: error
})
