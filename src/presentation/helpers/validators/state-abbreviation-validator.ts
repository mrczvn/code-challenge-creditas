import { getAllStates } from 'easy-location-br'
import { IValidator } from '../protocols'
import { equalsIgnoreCase } from '../../util/equals-ignore-case'

export class StateAbbreviationValidator implements IValidator {
  isValid(stateAbbreviation: string): boolean {
    return getAllStates().reduce(
      (acc, abv) => acc || equalsIgnoreCase(abv.id, stateAbbreviation),
      false
    )
  }
}
