import { IValidation } from '../protocols'

export class ValidationComposite implements IValidation {
  constructor(private readonly validations: IValidation[]) {}

  validate(input: any): Error {
    return this.validations.reduce(
      (previousValidation, currentValidation) =>
        previousValidation || currentValidation.validate(input),
      this.validations[0].validate(input)
    )
  }
}
