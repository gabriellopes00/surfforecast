import { mongoUrl } from '@src/config/env'
import mongoose, { Mongoose } from 'mongoose'

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

export const close = (): Promise<void> => mongoose.connection.close()
