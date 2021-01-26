import { InternalError } from '../../utils/errors/internal-error'

export class StormGlassRequestError extends InternalError {
  constructor(message: string, target: string) {
    const internalMessage = `Unexpected error when trying to communicate to ${target}`
    super(`${internalMessage}: ${message}`)
  }
}
