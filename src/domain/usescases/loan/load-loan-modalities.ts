import { CustomerRequest } from './customer-request'
import { CustomerModel } from '../../models'
import {
  ILoadLoanModalities,
  ILoanModalitiesResponse,
  ILoanModalitiesValidation
} from '../../protocols'

export class LoadLoanModalities implements ILoadLoanModalities {
  constructor(
    private readonly loansModalitiesValidation: ILoanModalitiesValidation[]
  ) {}

  load(customer: CustomerModel): ILoanModalitiesResponse {
    const customerRequest = new CustomerRequest(customer)

    const validLoans = this.loansModalitiesValidation.filter((loanValidation) =>
      loanValidation.validate(customerRequest)
    )

    if (!validLoans[0]) return null

    const loanModalites = validLoans
      .map((loanValidation) => loanValidation.loanPossibilities())
      .flat()
      .map((loanModality) => loanModality.getLoan())

    return { customer: customerRequest.getName(), loans: loanModalites }
  }
}
