import { decodeToken } from '../../infra/db/users/user-model'
import { NextFunction, Request, Response } from 'express'

export function AuthMiddleware(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  const token = req.headers?.['access-token']
  try {
    const decoded = decodeToken(token as string)
    req.decoded = decoded
    next()
  } catch (err) {
    res.status?.(401).send({ code: 401, error: err.message })
  }
}
