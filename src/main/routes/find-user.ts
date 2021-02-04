import { Router } from 'express'
import { adaptRoutes } from '../adapters/express-routes'
import { findUserController } from '../compositions/controllers/find-user-controller'

export default (router: Router): void => {
  router.get('/users/me', adaptRoutes(findUserController))
}
