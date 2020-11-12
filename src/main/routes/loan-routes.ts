import { Router } from 'express'
import { adaptRouter } from '../adapters/express-router-adapter'
import { makeFindLoanModalitiesController } from '../factories/controllers/loan/find-loan-modalities/find-loan-modalities-factory'

export default (router: Router): void => {
  router.post('/loan', adaptRouter(makeFindLoanModalitiesController()))
}
