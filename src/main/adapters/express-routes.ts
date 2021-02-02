import { Request, Response } from 'express'
import { Controller } from '@src/presentation/interfaces/controller'
import { HttpRequest } from '@src/presentation/interfaces/http'

export const adaptRoutes = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message })
    }
  }
}
