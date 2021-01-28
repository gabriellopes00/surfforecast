import mongoose, { Document, Model, Schema } from 'mongoose'
import { AddBeachModel } from '../../../domain/usecases/beaches/add-beach'

const schema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  // temp
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

export interface BeachSchema extends AddBeachModel, Document {}
export const Beach: Model<BeachSchema> = mongoose.model('Beach', schema)
