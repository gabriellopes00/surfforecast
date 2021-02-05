import { BeachModel, Position } from '@src/domain/models/beach'
import { RatingService } from '../rating-service'

describe('Rating service', () => {
  const fakeBeach: BeachModel = {
    id: 'asdf',
    lat: -33.792726,
    lng: 151.289824,
    name: 'Manly',
    position: Position.E,
    user: 'some_user'
  }

  const fakeRating = new RatingService(fakeBeach)

  describe('Calculate rating for a given point', () => {
    const fakePoint = {
      swellDirection: 110,
      swellHeight: 0.1,
      swellPeriod: 5,
      time: 'test',
      waveDirection: 110,
      waveHeight: 0.1,
      windDirection: 100,
      windSpeed: 100
    }

    it('Should get a rating less than 1 for a poor point', () => {
      const rating = fakeRating.getPointRating(fakePoint)
      expect(rating).toBe(1)
    })

    it('Should get a rating of 1 for an ok point', () => {
      const pointData = {
        swellHeight: 0.4
      }
      // using spread operator for cloning objects instead of Object.assign
      const point = { ...fakePoint, ...pointData }

      const rating = fakeRating.getPointRating(point)
      expect(rating).toBe(1)
    })

    it('Should get a rating of 3 for a point with offshore winds and a half overhead height', () => {
      const point = {
        ...fakePoint,
        ...{
          swellHeight: 0.7,
          windDirection: 250
        }
      }
      const rating = fakeRating.getPointRating(point)
      expect(rating).toBe(3)
    })

    it('Should get a rating of 4 for a point with offshore winds, half overhead high swell and good interval', () => {
      const point = {
        ...fakePoint,
        ...{
          swellHeight: 0.7,
          swellPeriod: 12,
          windDirection: 250
        }
      }
      const rating = fakeRating.getPointRating(point)
      expect(rating).toBe(4)
    })

    it('Should get a rating of 4 for a point with offshore winds, shoulder high swell and good interval', () => {
      const point = {
        ...fakePoint,
        ...{
          swellHeight: 1.5,
          swellPeriod: 12,
          windDirection: 250
        }
      }
      const rating = fakeRating.getPointRating(point)
      expect(rating).toBe(4)
    })

    it('Should get a rating of 5 classic day!', () => {
      const point = {
        ...fakePoint,
        ...{
          swellHeight: 2.5,
          swellPeriod: 16,
          windDirection: 250
        }
      }
      const rating = fakeRating.getPointRating(point)
      expect(rating).toBe(5)
    })
    it('Should get a rating of 4 a good condition but with crossshore winds', () => {
      const point = {
        ...fakePoint,
        ...{
          swellHeight: 2.5,
          swellPeriod: 16,
          windDirection: 130
        }
      }
      const rating = fakeRating.getPointRating(point)
      expect(rating).toBe(4)
    })
  })

  describe('Get rating based on wind and wave position', () => {
    it('Should get rating 1 for a beach with onshore winds', () => {
      const rating = fakeRating.getPositionRating(Position.E, Position.E)
      expect(rating).toBe(1)
    })
    it('Should get rating 3 for a beach with cross winds', () => {
      const rating = fakeRating.getPositionRating(Position.E, Position.S)
      expect(rating).toBe(3)
    })

    it('Should get rating 5 for a beach with offshore winds', () => {
      const rating = fakeRating.getPositionRating(Position.E, Position.W)
      expect(rating).toBe(5)
    })
  })

  describe('Get rating based on swell period', () => {
    it('Should get a rating of 1 for a period of 5 seconds', () => {
      const rating = fakeRating.getSwellPeriodRating(5)
      expect(rating).toBe(1)
    })

    it('Should get a rating of 2 for a period of 9 seconds', () => {
      const rating = fakeRating.getSwellPeriodRating(9)
      expect(rating).toBe(2)
    })

    it('Should get a rating of 4 for a period of 12 seconds', () => {
      const rating = fakeRating.getSwellPeriodRating(12)
      expect(rating).toBe(4)
    })

    it('Should get a rating of 5 for a period of 16 seconds', () => {
      const rating = fakeRating.getSwellPeriodRating(16)
      expect(rating).toBe(5)
    })
  })

  describe('Get rating based on swell height', () => {
    it('Should get rating 1 for less than ankle to knee high swell', () => {
      const rating = fakeRating.getSwellSizeRating(0.2)
      expect(rating).toBe(1)
    })
    it('Should get rating 2 for an ankle to knee swell', () => {
      const rating = fakeRating.getSwellSizeRating(0.6)
      expect(rating).toBe(2)
    })

    it('Should get rating 3 for waist high swell', () => {
      const rating = fakeRating.getSwellSizeRating(1.5)
      expect(rating).toBe(3)
    })

    it('Should get rating 5 for overhead swell', () => {
      const rating = fakeRating.getSwellSizeRating(2.5)
      expect(rating).toBe(5)
    })
  })

  describe('Get position based on points location', () => {
    it('Should get the point based on a east location', () => {
      const response = fakeRating.getPosition(92)
      expect(response).toBe(Position.E)
    })

    it('Should get the point based on a north location 1', () => {
      const response = fakeRating.getPosition(360)
      expect(response).toBe(Position.N)
    })

    it('Should get the point based on a north location 2', () => {
      const response = fakeRating.getPosition(40)
      expect(response).toBe(Position.N)
    })

    it('Should get the point based on a south location', () => {
      const response = fakeRating.getPosition(200)
      expect(response).toBe(Position.S)
    })

    it('Should get the point based on a west location', () => {
      const response = fakeRating.getPosition(300)
      expect(response).toBe(Position.W)
    })
  })
})
