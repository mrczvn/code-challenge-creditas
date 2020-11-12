import { typeLoanModality } from '../../models/loan-modality'
import { ICustomerRequest } from '../../protocols/customer-request'
import { ILoanModalitiesValidation } from '../../protocols/loan-modalities-validation'
import { ILoanModalityPossibility } from '../../protocols/loan-modality-possibility'
import { LoanModalityPossibility } from './loan-modality-possibility'

export class LoanModalityValidation4 implements ILoanModalitiesValidation {
  loanPossibilities(): ILoanModalityPossibility[] {
    return [
      new LoanModalityPossibility(typeLoanModality.personal, 4),
      new LoanModalityPossibility(typeLoanModality.warranty, 3)
    ]
  }

  validate(customer: ICustomerRequest): boolean {
    return (
      customer.topSalary(3000) &&
      customer.lowerSalary(5000) &&
      customer.fromSaoPaulo()
    )
  }
}
