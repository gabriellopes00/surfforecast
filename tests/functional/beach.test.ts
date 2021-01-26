import { Beach } from '@src/infra/db/beaches/models/beach'

describe('Beaches functional tests', () => {
  beforeAll(async () => await Beach.deleteMany({}))

  describe('When creating a beach ', () => {
    const newBeach = {
      lat: -33.792726,
      lng: 151.289824,
      name: 'Manly',
      position: 'E'
    }

    it('Should create a beach on success', async () => {
      const response = await global.testRequest.post('/beach').send(newBeach)
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(newBeach))
    })

    it('Should return 422 when there is a validation error', async () => {
      delete newBeach.lat
      const response = await global.testRequest.post('/beach').send(newBeach)
      expect(response.status).toBe(422)
      expect(response.body).toEqual({
        error: 'Beach validation failed: lat: Path `lat` is required.'
      })
    })
  })
})
