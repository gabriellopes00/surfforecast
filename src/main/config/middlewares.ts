import { Express, json, Request, Response, NextFunction } from 'express'
import cors from 'cors'

const bodyParser = json()
export const contentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.type('json')
  next()
}

export default (app: Express): void => {
  app.use(cors())
  app.use(bodyParser)
  app.use(contentType)
}
