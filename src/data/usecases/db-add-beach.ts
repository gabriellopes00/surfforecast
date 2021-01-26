import { AddBeach, AddBeachModel } from '@src/domain/usecases/add-beach'
import { AddBeachRepository } from '../interfaces/add-beach-repository'

export class DbAddBeach implements AddBeach {
  constructor(private readonly addAccountRepository: AddBeachRepository) {}

  async add(beachData: AddBeachModel): Promise<void> {
    await this.addAccountRepository.add(beachData)
  }
}
