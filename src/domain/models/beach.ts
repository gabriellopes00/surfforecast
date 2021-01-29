export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N'
}

export interface BeachModel {
  id: string
  name: string
  lat: number
  lng: number
  position: BeachPosition
  user: string
}
