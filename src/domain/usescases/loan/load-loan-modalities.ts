import { CustomerModel } from '@/domain/models/customer'
import {
  ILoadLoanModalities,
  ILoanModalitiesResponse
} from '../../protocols/load-loan-modalities'
import { ILoanModalitiesValidation } from '../../protocols/loan-modalities-validation'
import { CustomerRequest } from './customer-request'

export class LoadLoanModalities implements ILoadLoanModalities {
  constructor(
    private readonly loansModalitiesValidation: ILoanModalitiesValidation[]
  ) {}

  load(customer: CustomerModel): ILoanModalitiesResponse {
    const customerRequest = new CustomerRequest(customer)

    const validLoans = this.loansModalitiesValidation.filter((loanValidation) =>
      loanValidation.validate(customerRequest)
    )

    if (validLoans) {
      const loanModalites = validLoans
        .map((loanValidation) => loanValidation.loanPossibilities())
        .flat()
        .map((loanModality) => loanModality.getLoan())

      return { customer: customerRequest.getNome(), loans: loanModalites }
    }

    return null
  }
}
