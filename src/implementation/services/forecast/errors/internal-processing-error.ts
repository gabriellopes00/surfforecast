import { ServerError } from '@src/presentation/errors/server-error'

export class ForecastInternalProcessingError extends ServerError {
  constructor(public readonly message: string) {
    super(`Unexpected error  during the forecast processing: ${message}`)
  }
}
