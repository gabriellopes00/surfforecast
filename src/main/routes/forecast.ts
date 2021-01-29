import { Router } from 'express'
import { adaptRoutes } from '../adapters/express-routes'
import { forecastController } from '../compositions/forecast-controller'

import { AuthMiddleware } from '../../presentation/middlewares/auth'
export default (router: Router): void => {
  router.get('/forecast', AuthMiddleware, adaptRoutes(forecastController))
}
