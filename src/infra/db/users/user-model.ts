import mongoose, { Document, Model } from 'mongoose'
import { AddUserModel } from '@src/domain/usecases/users/add-user'

import bcrypt from 'bcrypt'
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

export async function compare(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, 'test', {
    expiresIn: 10000
  })
}

export interface DecodedUser extends Omit<UserModel, '_id'> {
  id: string
}

export function decodeToken(token: string): DecodedUser {
  return jwt.verify(token, 'test') as DecodedUser
}

export interface UserSchema extends AddUserModel, Document {}
export const User: Model<UserSchema> = mongoose.model('User', schema)
