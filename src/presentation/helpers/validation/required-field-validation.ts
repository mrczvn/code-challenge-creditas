import { MissingParamError } from '../errors'
import { IValidation } from '../protocols'

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
  }
}
