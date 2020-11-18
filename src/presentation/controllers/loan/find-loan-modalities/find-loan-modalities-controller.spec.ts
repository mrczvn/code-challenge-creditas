import { IValidation } from './find-loan-modalities-controller-protocols'
import { FindLoanModalitiesController } from './find-loan-modalities-controller'
import {
  ILoadLoanModalities,
  ILoanModalitiesResponse
} from '../../../../domain/protocols'
import { CustomerModel, typeLoanModality } from '../../../../domain/models'
import { IHttpRequest, IHttpResponse } from '../../../helpers/protocols'
import { MissingParamError } from '../../../helpers/errors'
import { badRequest, ok } from '../../../helpers/http/http-helper'

interface ISutTypes {
  sut: FindLoanModalitiesController
  validationStub: IValidation
  loadLoansModalitiesStub: ILoadLoanModalities
}

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadLoanModalities = (): ILoadLoanModalities => {
  class LoadLoanModalities implements ILoadLoanModalities {
    load(customer: CustomerModel): ILoanModalitiesResponse {
      return makeLoanModalitiesResponse(customer)
    }
  }

  return new LoadLoanModalities()
}

const makeLoanModalitiesResponse = (
  customer: CustomerModel
): ILoanModalitiesResponse => ({
  customer: customer.name,
  loans: [{ type: typeLoanModality.personal, taxes: 4 }]
})

const makeRequest = (): IHttpRequest => ({
  body: {
    customer: {
      name: 'Erika',
      cpf: '123.456.789-10',
      age: 29,
      location: 'BH',
      income: 3000
    }
  }
})

const makeSut = (): ISutTypes => {
  const validationStub = makeValidation()
  const loadLoansModalitiesStub = makeLoadLoanModalities()

  const sut = new FindLoanModalitiesController(
    validationStub,
    loadLoansModalitiesStub
  )

  return { sut, validationStub, loadLoansModalitiesStub }
}

describe('FindLoanModalitiesController', () => {
  describe('handle', () => {
    test('Should call Validation with correct values', async () => {
      const { sut, validationStub } = makeSut()

      const validateSpy = jest.spyOn(validationStub, 'validate')

      const httpRequest: IHttpRequest = makeRequest()

      await sut.handle(httpRequest)

      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.customer)
    })

    test('Should return 400 if Validation returns an error', async () => {
      const { sut, validationStub } = makeSut()

      jest
        .spyOn(validationStub, 'validate')
        .mockReturnValueOnce(new MissingParamError('any_field'))

      const httpResponse = await sut.handle(makeRequest())

      expect(httpResponse).toEqual(
        badRequest(new MissingParamError('any_field'))
      )
    })

    test('Should call LoadLoanModalities with correct values', async () => {
      const { sut, loadLoansModalitiesStub } = makeSut()

      const loadSpy = jest.spyOn(loadLoansModalitiesStub, 'load')

      const httpRequest: IHttpRequest = makeRequest()

      await sut.handle(httpRequest)

      expect(loadSpy).toHaveBeenCalledWith(httpRequest.body.customer)
    })

    test('Should return 200 if LoadLoanModalities returns loan modalities', async () => {
      const { sut } = makeSut()

      const httpRequest: IHttpRequest = makeRequest()

      const httpResponse: IHttpResponse = await sut.handle(httpRequest)

      expect(httpResponse).toEqual(
        ok(makeLoanModalitiesResponse(httpRequest.body.customer))
      )
    })

    test('Should return 200 if LoadLoanModalities returns null', async () => {
      const { sut, loadLoansModalitiesStub } = makeSut()

      jest.spyOn(loadLoansModalitiesStub, 'load').mockReturnValueOnce(null)

      const httpRequest: IHttpRequest = makeRequest()

      const httpResponse: IHttpResponse = await sut.handle(httpRequest)

      expect(httpResponse).toEqual(
        ok('no loan modality found for your profile')
      )
    })
  })
})
