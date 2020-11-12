import { typeLoanModality } from '../../models/loan-modality'
import { ICustomerRequest } from '../../protocols/customer-request'
import { ILoanModalitiesValidation } from '../../protocols/loan-modalities-validation'
import { ILoanModalityPossibility } from '../../protocols/loan-modality-possibility'
import { LoanModalityPossibility } from './loan-modality-possibility'

export class LoanModalityValidation5 implements ILoanModalitiesValidation {
  loanPossibilities(): ILoanModalityPossibility[] {
    return [
      new LoanModalityPossibility(typeLoanModality.personal, 4),
      new LoanModalityPossibility(typeLoanModality.consigned, 2)
    ]
  }

  validate(customer: ICustomerRequest): boolean {
    return customer.equalTopSalary(5000) && !customer.youngerThan(30)
  }
}
