import { DecodedUser } from '@src/infra/db/users/user-model'
import * as http from 'http'

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    decoded?: DecodedUser
  }
}
