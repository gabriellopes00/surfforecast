import { Express, json, Request, Response, NextFunction } from 'express'
import expressPino from 'express-pino-logger'
import logger from '../../config/logger'

const bodyParser = json()
export const contentType = (_: Request, res: Response, next: NextFunction) => {
  res.type('json')
  next()
}
export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}

export default (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
  app.use(expressPino({ logger }))
}
