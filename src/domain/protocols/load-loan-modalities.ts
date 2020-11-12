import { CustomerModel } from '../models/customer'
import { LoanModalityModel } from '../models/loan-modality'

export interface ILoanModalitiesResponse {
  customer: string
  loans: LoanModalityModel[]
}

export interface ILoadLoanModalities {
  load: (customer: CustomerModel) => ILoanModalitiesResponse
}
