import { Response } from 'express'

export interface ResponseData {
  message?: string
  data?: unknown
  error?: unknown
  errors?: unknown
}

const sendResponse = (
  res: Response,
  statusCode: number,
  responseData: ResponseData
): Response => {
  // Altere aqui para retornar Response
  const { message, data, error, errors } = responseData

  return res.status(statusCode).json({
    // Retorne o objeto Response
    message,
    data,
    errors,
    error: process.env.NODE_ENV === 'development' ? error : undefined
  })
}

export default sendResponse
