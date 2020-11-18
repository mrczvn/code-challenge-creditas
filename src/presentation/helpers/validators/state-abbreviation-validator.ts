import { getAllStates } from 'easy-location-br'
import { IValidator } from '../protocols'
import { equalsIgnoreCase } from '../../util/equal-ignore-case'

export class StateAbbreviationValidator implements IValidator {
  isValid(stateAbbreviation: string): boolean {
    if (!stateAbbreviation) return false

    return getAllStates().reduce(
      (acc, abv) => acc || equalsIgnoreCase(abv.id, stateAbbreviation),
      false
    )
  }
}
