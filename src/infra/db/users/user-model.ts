import mongoose, { Document, Model } from 'mongoose'
import { AddUserModel } from '@src/domain/models/user'

import jwt from 'jsonwebtoken'
import { UserModel } from '@src/domain/models/user'

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  }
)
export enum VALIDATION {
  DUPLICATED = 'DUPLICATED'
}

export interface DecodedUser extends Omit<UserModel, '_id'> {
  id: string
}

export function decodeToken(token: string): DecodedUser {
  return jwt.verify(token, 'test') as DecodedUser
}

export interface UserSchema extends AddUserModel, Document {}
export const User: Model<UserSchema> = mongoose.model('User', schema)
