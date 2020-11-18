import { badRequest, ok } from '../../../helpers/http/http-helper'
import {
  IController,
  IHttpResponse,
  IHttpRequest,
  IValidation,
  ILoadLoanModalities
} from './find-loan-modalities-controller-protocols'

export class FindLoanModalitiesController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly loadLoansModalities: ILoadLoanModalities
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    const { customer } = req.body

    const requiredFieldError: Error = this.validation.validate(customer)

    if (requiredFieldError) return badRequest(requiredFieldError)

    const loansModalities = this.loadLoansModalities.load(customer)

    if (!loansModalities) return ok('no loan modality found for your profile')

    return ok(loansModalities)
  }
}
