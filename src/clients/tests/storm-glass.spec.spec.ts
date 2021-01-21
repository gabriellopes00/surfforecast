import { StormGlassClient } from '../storm-glass'
import axios from 'axios'
import stormGlassWeather from '../../../tests/fixtures/stormglass-weather-response.json'

jest.mock('axios')

describe('StormGlass client', () => {
  it('Should return the normalized forecast from the StormGlass service', async () => {
    const latitude = -33.792726
    const longitude = 151.289824

    axios.get = jest.fn().mockResolvedValue(stormGlassWeather)
    const stormGlass = new StormGlassClient(axios)
    const response = await stormGlass.fetchPoints(latitude, longitude)

    expect(response).toEqual(stormGlassWeather)
  })
})
