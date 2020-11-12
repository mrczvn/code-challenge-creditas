import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '../../presentation/helpers/protocols'
import { NextFunction, Request, Response } from 'express'

export const adaptRouter = (controller: IController) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const httpRequest: IHttpRequest = { body: req.body }

  const { statusCode, body }: IHttpResponse = await controller.handle(
    httpRequest
  )

  if (statusCode >= 200 && statusCode <= 299) {
    return res.status(statusCode).json(body)
  }

  return res.status(statusCode).json({ error: body.message })
}
