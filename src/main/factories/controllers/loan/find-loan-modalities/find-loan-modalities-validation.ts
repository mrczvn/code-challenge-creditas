import { IValidation } from '../../../../../presentation/helpers/protocols'
import { CpfValidation } from '../../../../../presentation/helpers/validation/cpf-validation'
import { RequiredFieldValidation } from '../../../../../presentation/helpers/validation/required-field-validation'
import { StateAbbreviationValidation } from '../../../../../presentation/helpers/validation/state-abbreviation-validation'
import { ValidationComposite } from '../../../../../presentation/helpers/validation/validation-composite'
import { CpfValidator } from '../../../../../presentation/helpers/validators/cpf-validator'
import { StateAbbreviationValidator } from '../../../../../presentation/helpers/validators/state-abbreviation-validator'

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
