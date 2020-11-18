import { LoanModalityPossibility } from './loan-modality-possibility'
import { typeLoanModality } from '../../models'
import {
  ICustomerRequest,
  ILoanModalitiesValidation,
  ILoanModalityPossibility
} from '../../protocols'

export class LoanModalityValidation6 implements ILoanModalitiesValidation {
  loanPossibilities(): ILoanModalityPossibility[] {
    return [
      new LoanModalityPossibility(typeLoanModality.personal, 4),
      new LoanModalityPossibility(typeLoanModality.warranty, 3),
      new LoanModalityPossibility(typeLoanModality.consigned, 2)
    ]
  }

  validate(customer: ICustomerRequest): boolean {
    return customer.equalTopSalary(5000) && customer.youngerThan(30)
  }
}
