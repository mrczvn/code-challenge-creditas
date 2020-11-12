import {
  LoanModalityModel,
  typeLoanModality
} from '@/domain/models/loan-modality'
import { ILoanModalityPossibility } from '@/domain/protocols/loan-modality-possibility'

export class LoanModalityPossibility implements ILoanModalityPossibility {
  constructor(
    private readonly loanType: typeLoanModality,
    private readonly taxes: number
  ) {}

  getTipo(): typeLoanModality {
    return this.loanType
  }

  getTaxa(): number {
    return this.taxes
  }

  getLoan(): LoanModalityModel {
    return { type: this.loanType, taxes: this.taxes }
  }
}
