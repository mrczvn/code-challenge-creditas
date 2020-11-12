import { ICustomerRequest } from './customer-request'
import { ILoanModalityPossibility } from './loan-modality-possibility'

export interface ILoanModalitiesValidation {
  loanPossibilities: () => ILoanModalityPossibility[]

  validate: (customer: ICustomerRequest) => boolean
}
