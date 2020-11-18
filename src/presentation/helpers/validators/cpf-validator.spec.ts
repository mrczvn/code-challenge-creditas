import { CpfValidator } from './cpf-validator'

const makeSut = (): CpfValidator => new CpfValidator()

describe('CpfValidator Validator', () => {
  describe('isValid', () => {
    test('Should return true when isValid succeeds', () => {
      const sut = makeSut()

      expect(sut.isValid('138.973.030-19')).toBeTruthy()
    })

    test('Should return true when isValid succeeds', () => {
      const sut = makeSut()

      expect(sut.isValid('490.075.918-00')).toBeTruthy()
    })

    test('Should return false if blacklist numbers is provided', () => {
      const sut = makeSut()

      expect(sut.isValid('00000000000')).toBeFalsy()
      expect(sut.isValid('11111111111')).toBeFalsy()
      expect(sut.isValid('22222222222')).toBeFalsy()
      expect(sut.isValid('33333333333')).toBeFalsy()
      expect(sut.isValid('44444444444')).toBeFalsy()
      expect(sut.isValid('55555555555')).toBeFalsy()
      expect(sut.isValid('66666666666')).toBeFalsy()
      expect(sut.isValid('77777777777')).toBeFalsy()
      expect(sut.isValid('88888888888')).toBeFalsy()
      expect(sut.isValid('99999999999')).toBeFalsy()
      expect(sut.isValid('12345678909')).toBeFalsy()
    })

    test('Should return false if false values is provided', () => {
      const sut = makeSut()

      expect(sut.isValid('')).toBeFalsy()
      expect(sut.isValid(null)).toBeFalsy()
      expect(sut.isValid(undefined)).toBeFalsy()
    })

    test('Should return false when isValid fails', () => {
      const sut = makeSut()

      expect(sut.isValid('138.973.030-18')).toBeFalsy()
    })
  })
})
