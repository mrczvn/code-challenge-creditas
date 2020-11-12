import { LoadLoanModalities } from '../../../../../domain/usescases/loan/load-loan-modalities'
import { LoanModalityValidation1 } from '../../../../../domain/usescases/loan/loan-modality-validation1'
import { LoanModalityValidation2 } from '../../../../../domain/usescases/loan/loan-modality-validation2'
import { LoanModalityValidation3 } from '../../../../../domain/usescases/loan/loan-modality-validation3'
import { LoanModalityValidation4 } from '../../../../../domain/usescases/loan/loan-modality-validation4'
import { LoanModalityValidation5 } from '../../../../../domain/usescases/loan/loan-modality-validation5'
import { LoanModalityValidation6 } from '../../../../../domain/usescases/loan/loan-modality-validation6'
import { FindLoanModalitiesController } from '../../../../../presentation/controllers/loan/find-loan-modalities/find-loan-modalities-controller'
import { IController } from '../../../../../presentation/helpers/protocols'
import { makeFindLoanModalitiesValidation } from './find-loan-modalities-validation'

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
