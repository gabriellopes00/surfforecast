import { BeachModel } from '../models/beach'

export type AddBeachModel = Omit<BeachModel, 'id'>
export interface AddBeach {
  add(beachData: AddBeachModel): Promise<void>
}
