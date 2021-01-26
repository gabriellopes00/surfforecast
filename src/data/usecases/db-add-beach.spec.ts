import { BeachPosition } from '../../domain/models/beach'
import { AddBeachModel } from '../../domain/usecases/add-beach'
import { AddBeachRepository } from '../interfaces/add-beach-repository'
import { DbAddBeach } from './db-add-beach'

class AddBeachRepositoryStub implements AddBeachRepository {
  async add(beachData: AddBeachModel): Promise<void> {
    return new Promise(resolve => resolve())
  }
}

const makeSut = () => {
  const beachData: AddBeachModel = {
    lat: -33.792726,
    lng: 151.289824,
    name: 'Manly',
    position: BeachPosition.E
  }
  const addBeachRepositoryStub = new AddBeachRepositoryStub()
  const sut = new DbAddBeach(addBeachRepositoryStub)
  return { sut, addBeachRepositoryStub, beachData }
}

describe('DbAddBeach tests', () => {
  test('Should call AddBeachRepository with correct values', async () => {
    const { sut, addBeachRepositoryStub, beachData } = makeSut()
    const addSpy = jest.spyOn(addBeachRepositoryStub, 'add')
    await sut.add(beachData)
    expect(addSpy).toHaveBeenCalledWith(beachData)
  })
})
