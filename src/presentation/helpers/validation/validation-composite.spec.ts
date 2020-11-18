import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../errors'
import { IValidation } from '../protocols'

interface ISutTypes {
  sut: ValidationComposite
  validationsStubs: IValidation[]
}

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): ISutTypes => {
  const validationsStubs = [makeValidation(), makeValidation()]

  const sut = new ValidationComposite(validationsStubs)

  return { sut, validationsStubs }
}

describe('ValidationComposite', () => {
  describe('validate', () => {
    test('Should not return if validation succeeds', () => {
      const { sut } = makeSut()

      expect(sut.validate({ valid_field: 'any_value' })).toBeNull()
    })

    test('Should return an error if any validation fails', () => {
      const { sut, validationsStubs } = makeSut()

      jest
        .spyOn(validationsStubs[0], 'validate')
        .mockReturnValueOnce(new MissingParamError('invalid_field'))

      expect(sut.validate({ invalid_field: 'any_value' })).toEqual(
        new MissingParamError('invalid_field')
      )
    })

    test('Should return the first error if more then one validation fails', () => {
      const { sut, validationsStubs } = makeSut()

      jest
        .spyOn(validationsStubs[0], 'validate')
        .mockReturnValueOnce(new Error())
      jest
        .spyOn(validationsStubs[1], 'validate')
        .mockReturnValueOnce(new MissingParamError('invalid_field'))

      expect(sut.validate({ valid_field: 'any_value' })).toEqual(new Error())
    })
  })
})
