import { Router } from 'express'
import { AuthMiddleware } from '../../presentation/middlewares/auth'

export default (router: Router): void => {
  router.post('/test', AuthMiddleware, (req, res) => {
    res.send(req.decoded)
  })
}
