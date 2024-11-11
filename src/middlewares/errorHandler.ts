import { Request, Response, NextFunction } from 'express'

interface ErrorWithStatus extends Error {
  status?: number
}

export const errorHandler = (
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err)

  const status = err.status || 500
  const message = err.message || 'Erro interno do servidor.'

  res.status(status).json({ message })
}
