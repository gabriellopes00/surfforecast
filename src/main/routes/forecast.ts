import { Request, Router, Response } from 'express'
import rateLimit from 'express-rate-limit'
import { adaptRoutes } from '../adapters/express-routes'
import { forecastController } from '../compositions/controllers/forecast-controller'

import { AuthMiddleware } from '@src/presentation/middlewares/auth'

const RateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  keyGenerator(req: Request): string {
    return req.ip
  },
  handler(_, res: Response): void {
    res
      .status(400)
      .json({ error: 'Too many requests to the /forecast endpoint' })
  }
})
export default (router: Router): void => {
  router.get(
    '/forecast',
    RateLimiter,
    AuthMiddleware,
    adaptRoutes(forecastController)
  )
}
