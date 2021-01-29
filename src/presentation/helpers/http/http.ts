import { ServerError } from '../../errors/server-error'
import { HttpResponse } from './protocols'

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(error.message, error.stack)
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
