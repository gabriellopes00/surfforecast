import { InternalError } from '../../../utils/errors/internal-error'

export class StormGlassResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage = 'Unexpected error returned from StormGlass service'
    super(`${internalMessage}: ${message}`)
  }
}
