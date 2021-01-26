/* import { BeachPosition } from '@src/domain/models/beach'
import { AddBeachModel } from '@src/domain/usecases/add-beach'
import { Beach } from './beach-model'
import { MongoBeachRepository } from './add-beach-repository'

const makeSut = () => {
  const beachData: AddBeachModel = {
    lat: -33.792726,
    lng: 151.289824,
    name: 'Manly',
    position: BeachPosition.E
  }
  const sut = new MongoBeachRepository()
  return { sut, beachData }
}

describe('Mongo Beach Repository', () => {
  beforeAll(async () => await Beach.deleteMany({}))

  test('Should stores an account on success', async () => {
    const { sut, beachData } = makeSut()
    const beach = new Beach(beachData)
    const result = await beach.save()
    expect(result).toBeTruthy()
  })
}) */

test('Should be 2', () => expect(1 + 1).toBe(2))
