import { LoanModalityPossibility } from './loan-modality-possibility'
import { typeLoanModality } from '../../models'
import {
  ICustomerRequest,
  ILoanModalitiesValidation,
  ILoanModalityPossibility
} from '../../protocols'

export class LoanModalityValidation3 implements ILoanModalitiesValidation {
  loanPossibilities(): ILoanModalityPossibility[] {
    return [new LoanModalityPossibility(typeLoanModality.personal, 4)]
  }

  validate(customer: ICustomerRequest): boolean {
    return (
      customer.topSalary(3000) &&
      customer.lowerSalary(5000) &&
      !customer.fromSaoPaulo()
    )
  }
}
