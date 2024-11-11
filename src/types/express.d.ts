import { Request, Response } from 'express'
import { User } from '@models/User'
export interface CustomRequest extends Request {
  user?: User | null
}

export interface Context {
  req: CustomRequest
  res: Response
}
