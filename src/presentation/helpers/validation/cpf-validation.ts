import { InvalidParamError } from '../errors/invalid-param-error'
import { IValidation, IValidator } from '../protocols'

export class CpfValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly cpfValidator: IValidator
  ) {}

  validate(input: any): Error {
    if (!this.cpfValidator.isValid(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
