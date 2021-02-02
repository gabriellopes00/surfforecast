import { Router } from 'express'
import { adaptRoutes } from '../adapters/express-routes'
import { forecastController } from '../compositions/controllers/forecast-controller'

import { AuthMiddleware } from '@src/presentation/middlewares/auth'
export default (router: Router): void => {
  router.get('/forecast', AuthMiddleware, adaptRoutes(forecastController))
}
