import { InternalError } from '../../../../utils/errors/internal-error'

export class ForecastInternalProcessingError extends InternalError {
  constructor(public readonly message: string) {
    super(`Unexpected error  during the forecast processing: ${message}`)
  }
}
