import { Response, NextFunction } from 'express'
import sendResponse from '@utils/response'
import { messages } from '@utils/messages'
import { verifyToken } from '@utils/jwt'
import { CustomRequest } from 'types/express'

const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    sendResponse(res, 401, {
      message: messages.errors.TOKEN_INVALID
    })
    return
  }

  try {
    const user = verifyToken(token, 'auth')

    console.log(user)

    if (!user || typeof user !== 'object') {
      sendResponse(res, 403, {
        message: messages.errors.TOKEN_INVALID
      })
      return
    }

    req.user = user
    next()
  } catch (_err) {
    sendResponse(res, 403, {
      message: messages.errors.TOKEN_INVALID
    })
    return
  }
}

export default authenticateToken
