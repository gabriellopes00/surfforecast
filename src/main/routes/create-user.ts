import { Router } from 'express'
import { adaptRoutes } from '../adapters/express-routes'
import { createUserController } from '../compositions/controllers/create-user-controller'

export default (router: Router): void => {
  router.post('/users', adaptRoutes(createUserController))
}
