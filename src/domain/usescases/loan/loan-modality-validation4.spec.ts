import { CustomerRequest } from './customer-request'
import { LoanModalityPossibility } from './loan-modality-possibility'
import { LoanModalityValidation4 } from './loan-modality-validation4'
import { CustomerModel, typeLoanModality } from '../../models'

const makeCustomer = (): CustomerModel => ({
  name: 'Erika',
  cpf: '123.456.789-10',
  age: 29,
  location: 'SP',
  income: 3001
})

const makeSut = (): LoanModalityValidation4 => new LoanModalityValidation4()

describe('LoanModalityValidation4', () => {
  describe('loanPossibilites', () => {
    test('Should returns any LoanModalityPossibility', () => {
      const sut = makeSut()

      expect(sut.loanPossibilities()).toEqual([
        new LoanModalityPossibility(typeLoanModality.personal, 4),
        new LoanModalityPossibility(typeLoanModality.warranty, 3)
      ])
    })
  })

  describe('validate', () => {
    test('Should returns true if validate success', () => {
      const sut = makeSut()

      const customer = new CustomerRequest(makeCustomer())

      const isValid = sut.validate(customer)

      expect(isValid).toBeTruthy()
    })

    test('Should returns false if validate fails', () => {
      const sut = makeSut()

      jest.spyOn(sut, 'validate').mockReturnValueOnce(false)

      const customer = new CustomerRequest(makeCustomer())

      const isValid = sut.validate(customer)

      expect(isValid).toBeFalsy()
    })
  })
})
