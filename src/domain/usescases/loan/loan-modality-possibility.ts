import { LoanModalityModel, typeLoanModality } from '../../models'
import { ILoanModalityPossibility } from '../../protocols'

export class LoanModalityPossibility implements ILoanModalityPossibility {
  constructor(
    private readonly loanType: typeLoanModality,
    private readonly taxes: number
  ) {}

  getLoan(): LoanModalityModel {
    return { type: this.loanType, taxes: this.taxes }
  }
}
