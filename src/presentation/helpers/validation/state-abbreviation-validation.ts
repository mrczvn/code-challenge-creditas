import { InvalidParamError } from '../errors/invalid-param-error'
import { IValidation, IValidator } from '../protocols'

export class StateAbbreviationValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly stateAbbreviationValidator: IValidator
  ) {}

  validate(input: any): Error {
    if (!this.stateAbbreviationValidator.isValid(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
