import mongoose, { Document, Model } from 'mongoose'
import { AddUserModel } from '@src/domain/usecases/users/add-user'

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

export interface UserSchema extends AddUserModel, Document {}
export const User: Model<UserSchema> = mongoose.model('User', schema)
