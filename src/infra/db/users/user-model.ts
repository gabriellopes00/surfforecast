import mongoose, { Document, Model } from 'mongoose'
import { AddUserModel } from '@src/domain/usecases/users/add-user'

import bcrypt from 'bcrypt'

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

schema.path('email').validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email })
    return !emailCount
  },
  'already exists in the database.',
  VALIDATION.DUPLICATED
)

schema.pre<UserSchema>('save', async function (): Promise<void> {
  if (!this.password || !this.isModified('password')) {
    return
  }
  try {
    const hashedPassword = await hashPassword(this.password)
    this.password = hashedPassword
  } catch (err) {
    console.error(`Error hashing the password for the user ${this.name}`, err)
  }
})

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function compare(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export interface UserSchema extends AddUserModel, Document {}
export const User: Model<UserSchema> = mongoose.model('User', schema)