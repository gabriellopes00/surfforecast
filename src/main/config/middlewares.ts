import { Express, json, Request, Response, NextFunction } from 'express'

const bodyParser = json()
export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}
export const contentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.type('json')
  next()
}

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
