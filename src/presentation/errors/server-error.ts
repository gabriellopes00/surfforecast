export class ServerError extends Error {
  constructor(public message: string, protected description?: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
