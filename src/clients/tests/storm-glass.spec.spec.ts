import { StormGlassClient } from '../storm-glass'
import stormGlassWeather from '../../../tests/fixtures/stormglass-weather-response.json'
import stormGlassNormalizedData from '../../../tests/fixtures/stormglass-normalized-response.json'
import axios from 'axios'

jest.mock('axios')

describe('StormGlass client', () => {
  // Will unite the axios types and method with the jest types and methods (mocks)
  const mockedAxios = axios as jest.Mocked<typeof axios>

  it('Should return the normalized forecast from the StormGlass service', async () => {
    const latitude = -33.792726
    const longitude = 151.289824

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather })
    const stormGlass = new StormGlassClient(mockedAxios)
    const response = await stormGlass.fetchPoints(latitude, longitude)

    expect(response).toEqual(stormGlassNormalizedData)
  })
})
