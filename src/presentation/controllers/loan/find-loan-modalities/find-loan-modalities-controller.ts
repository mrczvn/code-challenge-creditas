import { IValidation } from '../../../helpers/protocols'
import { badRequest, ok } from '../../../helpers/http/http-helper'
import {
  IController,
  IHttpResponse,
  IHttpRequest
} from './find-loan-modalities-controller-protocols'
import { ILoadLoanModalities } from '../../../../domain/protocols/load-loan-modalities'

export class FindLoanModalitiesController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly loadLoansModalities: ILoadLoanModalities
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    const { customer } = req.body

    const requiredFieldError: Error = this.validation.validate(customer)

    if (requiredFieldError) return badRequest(requiredFieldError)

    return ok(this.loadLoansModalities.load(customer))
  }
}
