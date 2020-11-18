import { CustomerModel, LoanModalityModel } from '../models'

export interface ILoanModalitiesResponse {
  customer: string
  loans: LoanModalityModel[]
}

export interface ILoadLoanModalities {
  load: (customer: CustomerModel) => ILoanModalitiesResponse
}
