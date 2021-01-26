import { BeachModel, BeachPosition } from '../../domain/models/beach'
import { AddBeachModel } from '../../domain/usecases/add-beach'
import { AddBeachRepository } from '../interfaces/add-beach-repository'
import { DbAddBeach } from './db-add-beach'

class AddBeachRepositoryStub implements AddBeachRepository {
  async add(beachData: AddBeachModel): Promise<BeachModel> {
    return new Promise(resolve =>
      resolve({
        id: 'any_id',
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E
      })
    )
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
  it('Should call AddBeachRepository with correct values', async () => {
    const { sut, addBeachRepositoryStub, beachData } = makeSut()
    const addSpy = jest.spyOn(addBeachRepositoryStub, 'add')
    await sut.add(beachData)
    expect(addSpy).toHaveBeenCalledWith(beachData)
  })

  it('Should return a beach on success', async () => {
    const { sut, beachData } = makeSut()
    const beach = await sut.add(beachData)
    expect(beach).toEqual({ id: 'any_id', ...beachData })
  })

  it('Should throw if addBeachRepository throws', async () => {
    const { sut, addBeachRepositoryStub, beachData } = makeSut()
    jest.spyOn(addBeachRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )

    const beach = sut.add(beachData)
    await expect(beach).rejects.toThrow()
  })
})
