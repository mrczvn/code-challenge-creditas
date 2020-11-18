import { InvalidParamError } from '../errors'
import { IValidator } from '../protocols'
import { StateAbbreviationValidation } from './state-abbreviation-validation'

interface ISutTypes {
  sut: StateAbbreviationValidation
  stateAbbreviationValidatorStub: IValidator
}

const makeStateAbbreviationValidator = (): IValidator => {
  class StateAbbreviationValidatorStub implements IValidator {
    isValid(input: string): boolean {
      return true
    }
  }
  return new StateAbbreviationValidatorStub()
}

const makeSut = (): ISutTypes => {
  const stateAbbreviationValidatorStub = makeStateAbbreviationValidator()

  const sut = new StateAbbreviationValidation(
    'location',
    stateAbbreviationValidatorStub
  )

  return { sut, stateAbbreviationValidatorStub }
}

describe('StateAbbreviationValidation', () => {
  describe('validate', () => {
    test('Should call StateAbbreviationValidator with correct values', () => {
      const { sut, stateAbbreviationValidatorStub } = makeSut()

      const isValidSpy = jest.spyOn(stateAbbreviationValidatorStub, 'isValid')

      sut.validate({ location: 'any_location' })

      expect(isValidSpy).toHaveBeenCalledWith('any_location')
    })

    test('Should return an error if StateAbbreviationValidator fails', () => {
      const { sut, stateAbbreviationValidatorStub } = makeSut()

      jest
        .spyOn(stateAbbreviationValidatorStub, 'isValid')
        .mockReturnValueOnce(false)

      expect(sut.validate({ location: 'invalid_location' })).toEqual(
        new InvalidParamError('location')
      )
    })

    test('Should not return if StateAbbreviationValidator success', () => {
      const { sut } = makeSut()

      expect(sut.validate({ location: 'valid_location' })).toBeFalsy()
    })
  })
})
