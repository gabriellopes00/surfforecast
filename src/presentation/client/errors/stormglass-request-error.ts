import { ServerError } from '../../errors/server-error'

export class StormGlassRequestError extends ServerError {
  constructor(message: string, target: string) {
    const internalMessage = `Unexpected error when trying to communicate to ${target}`
    super(`${internalMessage}: ${message}`)
  }
}
