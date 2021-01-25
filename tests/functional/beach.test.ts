describe('Beaches functional tests', () => {
  describe('When creating a beach ', () => {
    it('Should create a beach on success', async () => {
      const newBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E'
      }

      const response = await global.testRequest.post('/beach').send(newBeach)
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(newBeach))
    })
  })
})
