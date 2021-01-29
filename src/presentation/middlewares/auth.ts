import { UserModel } from '../../domain/models/user'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { secretKey } from '../../../config/env'

export interface DecodedUser extends Omit<UserModel, '_id'> {
  id: string
}

export function decodeToken(token: string): DecodedUser {
  return jwt.verify(token, secretKey) as DecodedUser
}

export function AuthMiddleware(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  const token = req.headers?.['access-token']
  try {
    const decoded = decodeToken(token as string)
    req.decoded = decoded.id
    next()
  } catch (err) {
    res.status?.(401).send({ error: err.message })
  }
}
