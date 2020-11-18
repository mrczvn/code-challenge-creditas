import { LoanModalityPossibility } from './loan-modality-possibility'
import { typeLoanModality } from '../../models'
import {
  ICustomerRequest,
  ILoanModalitiesValidation,
  ILoanModalityPossibility
} from '../../protocols'

export class LoanModalityValidation2 implements ILoanModalitiesValidation {
  loanPossibilities(): ILoanModalityPossibility[] {
    return [
      new LoanModalityPossibility(typeLoanModality.personal, 4),
      new LoanModalityPossibility(typeLoanModality.warranty, 3)
    ]
  }

  validate(customer: ICustomerRequest): boolean {
    return (
      customer.equalLowerSalary(3000) &&
      customer.youngerThan(30) &&
      customer.fromSaoPaulo()
    )
  }
}
