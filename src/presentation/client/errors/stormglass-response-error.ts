import { ServerError } from '../../errors/server-error'

export class StormGlassResponseError extends ServerError {
  constructor(message: string) {
    const internalMessage = 'Unexpected error returned from StormGlass service'
    super(`${internalMessage}: ${message}`)
  }
}
