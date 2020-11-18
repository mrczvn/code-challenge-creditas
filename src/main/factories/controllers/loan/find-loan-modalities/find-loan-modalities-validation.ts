import { IValidation } from '../../../../../presentation/helpers/protocols'
import {
  CpfValidation,
  ValidationComposite,
  StateAbbreviationValidation,
  RequiredFieldValidation
} from '../../../../../presentation/helpers/validation'
import {
  CpfValidator,
  StateAbbreviationValidator
} from '../../../../../presentation/helpers/validators'

export const makeFindLoanModalitiesValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  const requiredFields: string[] = ['name', 'cpf', 'age', 'location', 'income']

  requiredFields.forEach((field) =>
    validations.push(new RequiredFieldValidation(field))
  )

  validations.push(new CpfValidation('cpf', new CpfValidator()))
  validations.push(
    new StateAbbreviationValidation(
      'location',
      new StateAbbreviationValidator()
    )
  )

  return new ValidationComposite(validations)
}
