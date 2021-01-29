import { Router } from 'express'
import { adaptRoutes } from '../adapters/express-routes'
import { beachController } from '../compositions/beach-controller'

import { AuthMiddleware } from '../../presentation/middlewares/auth'
export default (router: Router): void => {
  router.post('/beach', AuthMiddleware, adaptRoutes(beachController))
}
