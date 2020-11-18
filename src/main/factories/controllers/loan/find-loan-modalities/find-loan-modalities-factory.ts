import { makeFindLoanModalitiesValidation } from './find-loan-modalities-validation'
import {
  LoadLoanModalities,
  LoanModalityValidation1,
  LoanModalityValidation2,
  LoanModalityValidation3,
  LoanModalityValidation4,
  LoanModalityValidation5,
  LoanModalityValidation6
} from '../../../../../domain/usescases/loan'
import { IController } from '../../../../../presentation/helpers/protocols'
import { FindLoanModalitiesController } from '../../../../../presentation/controllers/loan/find-loan-modalities/find-loan-modalities-controller'

export const makeFindLoanModalitiesController = (): IController => {
  const loanModalityValidation1 = new LoanModalityValidation1()
  const loanModalityValidation2 = new LoanModalityValidation2()
  const loanModalityValidation3 = new LoanModalityValidation3()
  const loanModalityValidation4 = new LoanModalityValidation4()
  const loanModalityValidation5 = new LoanModalityValidation5()
  const loanModalityValidation6 = new LoanModalityValidation6()

  const loadLoansModalities = new LoadLoanModalities([
    loanModalityValidation1,
    loanModalityValidation2,
    loanModalityValidation3,
    loanModalityValidation4,
    loanModalityValidation5,
    loanModalityValidation6
  ])

  return new FindLoanModalitiesController(
    makeFindLoanModalitiesValidation(),
    loadLoansModalities
  )
}
