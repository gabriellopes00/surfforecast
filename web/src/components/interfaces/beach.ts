export interface Props {
  beaches: Beach[]
}

export enum Position {
  'W' = 'w',
  'E' = 'E',
  'N' = 'N',
  'S' = 'N'
}

export interface Beach {
  name: string
  position: Position
  lat: number
  lng: number
}
