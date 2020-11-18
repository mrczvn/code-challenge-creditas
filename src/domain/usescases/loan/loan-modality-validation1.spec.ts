import { CustomerRequest } from './customer-request'
import { LoanModalityPossibility } from './loan-modality-possibility'
import { LoanModalityValidation1 } from './loan-modality-validation1'
import { CustomerModel, typeLoanModality } from '../../models'

const makeCustomer = (): CustomerModel => ({
  name: 'Erika',
  cpf: '123.456.789-10',
  age: 29,
  location: 'sp',
  income: 3000
})

const makeSut = (): LoanModalityValidation1 => new LoanModalityValidation1()

describe('LoanModalityValidation1', () => {
  describe('loanPossibilites', () => {
    test('Should returns any LoanModalityPossibility', () => {
      const sut = makeSut()

      expect(sut.loanPossibilities()).toEqual([
        new LoanModalityPossibility(typeLoanModality.personal, 4)
      ])
    })
  })

  describe('validate', () => {
    test('Should returns true if validate success', () => {
      const sut = makeSut()

      jest.spyOn(sut, 'validate').mockReturnValueOnce(true)

      const customer = new CustomerRequest(makeCustomer())

      const isValid = sut.validate(customer)

      expect(isValid).toBeTruthy()
    })

    test('Should returns false if validate fails', () => {
      const sut = makeSut()

      const customer = new CustomerRequest(makeCustomer())

      const isValid = sut.validate(customer)

      expect(isValid).toBeFalsy()
    })
  })
})
