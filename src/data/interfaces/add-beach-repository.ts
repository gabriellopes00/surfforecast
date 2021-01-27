import { BeachModel } from '@src/domain/models/beach'
import { AddBeachModel } from '../../domain/usecases/beaches/add-beach'

export interface AddBeachRepository {
  add(beachData: AddBeachModel): Promise<BeachModel>
}
