import { StateAbbreviationValidator } from './state-abbreviation-validator'

const makeSut = (): StateAbbreviationValidator =>
  new StateAbbreviationValidator()

describe('StateAbbreviation Validator', () => {
  describe('isValid', () => {
    test('Should return true when isValid succeeds', () => {
      const sut = makeSut()

      expect(sut.isValid('sp')).toBeTruthy()
    })

    test('Should return false if false values are provided', () => {
      const sut = makeSut()

      expect(sut.isValid('')).toBeFalsy()
      expect(sut.isValid(null)).toBeFalsy()
      expect(sut.isValid(undefined)).toBeFalsy()
    })

    test('Should return false when isValid fails', () => {
      const sut = makeSut()

      expect(sut.isValid('any_value')).toBeFalsy()
    })
  })
})
