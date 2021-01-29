import { BeachModel } from '@src/domain/models/beach'
import mongoose, { Document, Model, Schema } from 'mongoose'

const schema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
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

export interface BeachSchema extends Omit<BeachModel, 'id'>, Document {}
export const Beach: Model<BeachSchema> = mongoose.model('Beach', schema)
