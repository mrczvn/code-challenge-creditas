import { CustomerRequest } from './customer-request'
import { LoadLoanModalities } from './load-loan-modalities'
import {
  CustomerModel,
  LoanModalityModel,
  typeLoanModality
} from '../../models'
import {
  ICustomerRequest,
  ILoanModalitiesValidation,
  ILoanModalityPossibility
} from '../../protocols'

interface ISutTypes {
  sut: LoadLoanModalities
  loansModalitiesValidationStub: ILoanModalitiesValidation[]
}

const makeLoansModalitiesValidation = (): ILoanModalitiesValidation => {
  class LoanModalitiesValidation implements ILoanModalitiesValidation {
    loanPossibilities(): ILoanModalityPossibility[] {
      return [makeLoanModalityPossibility()]
    }

    validate(customer: ICustomerRequest): boolean {
      return true
    }
  }

  return new LoanModalitiesValidation()
}

const makeLoanModalityPossibility = (): ILoanModalityPossibility => {
  class LoanModalityPossibility implements ILoanModalityPossibility {
    getLoan(): LoanModalityModel {
      return { type: typeLoanModality.personal, taxes: 4 }
    }
  }

  return new LoanModalityPossibility()
}

const makeCustomer = (): CustomerModel => ({
  name: 'Erika',
  cpf: '123.456.789-10',
  age: 29,
  location: 'BH',
  income: 3000
})

const makeSut = (): ISutTypes => {
  const loansModalitiesValidationStub = [
    makeLoansModalitiesValidation(),
    makeLoansModalitiesValidation()
  ]

  const sut = new LoadLoanModalities(loansModalitiesValidationStub)

  return { sut, loansModalitiesValidationStub }
}

describe('LoadLoanModalities', () => {
  describe('load', () => {
    test('Should call LoansModalitiesValidation.validate with correct values', () => {
      const { sut, loansModalitiesValidationStub } = makeSut()

      const validateSpy1 = jest.spyOn(
        loansModalitiesValidationStub[0],
        'validate'
      )

      const validateSpy2 = jest.spyOn(
        loansModalitiesValidationStub[1],
        'validate'
      )

      const customer = new CustomerRequest(makeCustomer())

      sut.load(makeCustomer())

      expect(validateSpy1).toHaveBeenCalledWith(customer)
      expect(validateSpy2).toHaveBeenCalledWith(customer)
    })

    test('Should returns null if all validation fails', () => {
      const { sut, loansModalitiesValidationStub } = makeSut()

      jest
        .spyOn(loansModalitiesValidationStub[0], 'validate')
        .mockReturnValueOnce(false)

      jest
        .spyOn(loansModalitiesValidationStub[1], 'validate')
        .mockReturnValueOnce(false)

      const loanModalities = sut.load(makeCustomer())

      expect(loanModalities).toBeNull()
    })

    test('Should returns the first type of loan if the second validation fails', () => {
      const { sut, loansModalitiesValidationStub } = makeSut()
      jest
        .spyOn(loansModalitiesValidationStub[1], 'validate')
        .mockReturnValueOnce(false)

      const customer = new CustomerRequest(makeCustomer())

      const loanModalities = sut.load(makeCustomer())

      expect(loanModalities).toEqual({
        customer: customer.getName(),
        loans: loansModalitiesValidationStub[0]
          .loanPossibilities()
          .flat()
          .map((a) => a.getLoan())
      })
    })

    test('Should return all types of loans if all success validations', () => {
      const { sut, loansModalitiesValidationStub } = makeSut()

      const customer = new CustomerRequest(makeCustomer())

      const loanModalities = sut.load(makeCustomer())

      const modality1 = loansModalitiesValidationStub[0]
        .loanPossibilities()
        .flat()
        .map((a) => a.getLoan())

      const modality2 = loansModalitiesValidationStub[1]
        .loanPossibilities()
        .flat()
        .map((a) => a.getLoan())

      expect(loanModalities).toEqual({
        customer: customer.getName(),
        loans: [...modality1, ...modality2]
      })
    })
  })
})
