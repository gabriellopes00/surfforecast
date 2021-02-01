import { BeachModel } from '../../models/beach'

export type AddBeachModel = Omit<BeachModel, 'id' | 'user'>

export interface UserBeachModel extends AddBeachModel {
  user: string
}
export interface AddBeach {
  add(beachData: UserBeachModel): Promise<BeachModel>
}
