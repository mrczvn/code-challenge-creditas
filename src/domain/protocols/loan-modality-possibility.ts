import { LoanModalityModel, typeLoanModality } from '../models/loan-modality'

export interface ILoanModalityPossibility {
  getTipo: () => typeLoanModality

  getTaxa: () => number

  getLoan: () => LoanModalityModel
}
