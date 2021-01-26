import { BeachPosition } from '@src/domain/models/beach'
import { AddBeachModel } from '@src/domain/usecases/add-beach'
import { Beach } from '@src/infra/db/beaches/beach-model'
import { MongoBeachRepository } from '@src/infra/db/beaches/add-beach-repository'

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

describe('Mongo Beach Repository functional tests', () => {
  beforeAll(async () => await Beach.deleteMany({}))
  afterAll(async () => await Beach.deleteMany({}))

  it('Should stores an account on success', async () => {
    const { sut, beachData } = makeSut()
    await sut.add(beachData)

    const result = await Beach.findOne({ name: 'Manly' })
    expect(result).toBeTruthy()
  })
})
