export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('Received email already in use')
    this.name = 'EmailAlreadyInUseError'
  }
}
