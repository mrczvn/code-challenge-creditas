import { CpfValidation } from './cpf-validation'
import { InvalidParamError } from '../errors'
import { IValidator } from '../protocols'

interface ISutTypes {
  sut: CpfValidation
  cpfValidatorStub: IValidator
}

const makeCpfValidator = (): IValidator => {
  class CpfValidatorStub implements IValidator {
    isValid(input: string): boolean {
      return true
    }
  }
  return new CpfValidatorStub()
}

const makeSut = (): ISutTypes => {
  const cpfValidatorStub = makeCpfValidator()

  const sut = new CpfValidation('cpf', cpfValidatorStub)

  return { sut, cpfValidatorStub }
}

describe('CpfValidation', () => {
  describe('validate', () => {
    test('Should call CpfValidator with correct values', () => {
      const { sut, cpfValidatorStub } = makeSut()

      const isValidSpy = jest.spyOn(cpfValidatorStub, 'isValid')

      sut.validate({ cpf: '123.456.789-09' })

      expect(isValidSpy).toHaveBeenCalledWith('123.456.789-09')
    })

    test('Should not return if CpfValidator success', () => {
      const { sut } = makeSut()

      expect(sut.validate({ cpf: '123.456.789-09' })).toBeFalsy()
    })

    test('Should return an error if CpfValidator fails', () => {
      const { sut, cpfValidatorStub } = makeSut()

      jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false)

      expect(sut.validate({ cpf: '123.456.789-09' })).toEqual(
        new InvalidParamError('cpf')
      )
    })
  })
})
