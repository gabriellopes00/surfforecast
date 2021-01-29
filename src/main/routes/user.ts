import { Router } from 'express'
import { adaptRoutes } from '../adapters/express-routes'
import { usersController } from '../compositions/user-controller'

export default (router: Router): void => {
  router.post('/users', adaptRoutes(usersController))
}
