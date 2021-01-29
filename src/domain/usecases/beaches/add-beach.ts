import { BeachModel } from '../../models/beach'

export interface AddBeachModel extends Omit<BeachModel, 'id' | 'user'> {}

export interface UserBeachModel extends AddBeachModel {
  user: string
}
export interface AddBeach {
  add(beachData: UserBeachModel): Promise<BeachModel>
}
