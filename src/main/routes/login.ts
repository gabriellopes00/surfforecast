import { Router } from 'express'
import { loginController } from '../compositions/controllers/login-controller'
import { adaptRoutes } from '../adapters/express-routes'

export default (router: Router): void => {
  router.post('/login', adaptRoutes(loginController))
}
