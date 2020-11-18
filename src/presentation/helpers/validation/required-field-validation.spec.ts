import { MissingParamError } from '../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation('valid_field')

describe('RequiredFieldValidation', () => {
  describe('validate', () => {
    test('Should not return if RequiredFieldValidation success', () => {
      const sut = makeSut()

      expect(sut.validate({ valid_field: 'any_value' })).toBeFalsy()
    })

    test('Should returns an if RequiredFieldValidation fails', () => {
      const sut = makeSut()

      expect(sut.validate({ invalid_field: 'any_value' })).toEqual(
        new MissingParamError('valid_field')
      )
    })
  })
})
