import { BeachModel, Position } from '@src/domain/models/beach'
import { ForecastPoint } from '@src/domain/models/forecast'

const waveHeights = {
  ankleToKnee: {
    min: 0.3,
    max: 1.0
  },
  waistHigh: {
    min: 1.0,
    max: 2.0
  },
  headHigh: {
    min: 2.0,
    max: 2.5
  }
}

export class RatingService {
  constructor(private beach: BeachModel) {}

  public getPointRating(point: ForecastPoint): number {
    const swellDirection = this.getPosition(point.swellDirection)
    const windDirection = this.getPosition(point.windDirection)
    const windAndWaveRating = this.getPositionRating(
      swellDirection,
      windDirection
    )
    const swellHeightRating = this.getSwellSizeRating(point.swellHeight)
    const swellPeriodRating = this.getSwellPeriodRating(point.swellPeriod)
    const finalRating =
      (windAndWaveRating + swellHeightRating + swellPeriodRating) / 3
    return Math.round(finalRating)
  }

  public getPositionRating(
    waveDirection: Position,
    windDirection: Position
  ): number {
    if (waveDirection === windDirection) {
      return 1
    } else if (this.isWindOffShore(waveDirection, windDirection)) {
      return 5
    }
    return 3
  }

  private isWindOffShore(
    waveDirection: string,
    windDirection: string
  ): boolean {
    return (
      (waveDirection === Position.N &&
        windDirection === Position.S &&
        this.beach.position === Position.N) ||
      (waveDirection === Position.S &&
        windDirection === Position.N &&
        this.beach.position === Position.S) ||
      (waveDirection === Position.E &&
        windDirection === Position.W &&
        this.beach.position === Position.E) ||
      (waveDirection === Position.W &&
        windDirection === Position.E &&
        this.beach.position === Position.W)
    )
  }

  public getSwellPeriodRating(period: number): number {
    if (period >= 7 && period < 10) {
      return 2
    }

    if (period >= 10 && period < 14) {
      return 4
    }
    if (period >= 14) {
      return 5
    }

    return 1
  }

  public getSwellSizeRating(height: number): number {
    if (
      height >= waveHeights.ankleToKnee.min &&
      height < waveHeights.ankleToKnee.max
    ) {
      return 2
    }
    if (
      height >= waveHeights.waistHigh.min &&
      height < waveHeights.waistHigh.max
    ) {
      return 3
    }
    if (height >= waveHeights.headHigh.min) {
      return 5
    }

    return 1
  }

  public getPosition(coordinates: number): Position {
    if (coordinates >= 310 || (coordinates < 50 && coordinates >= 0)) {
      return Position.N
    }
    if (coordinates >= 50 && coordinates < 120) {
      return Position.E
    }
    if (coordinates >= 120 && coordinates < 220) {
      return Position.S
    }
    if (coordinates >= 220 && coordinates < 310) {
      return Position.W
    }
    return Position.E
  }
}
