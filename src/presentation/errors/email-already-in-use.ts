export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('Received email is already in use')
    this.name = 'EmailAlreadyInUseError'
  }
}
