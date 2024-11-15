import sendResponse from '@utils/response'
import { Request, Response } from 'express'
import { messages } from '@utils/messages'
import { login, register } from '@services/auth.service'
import { refeshToken } from '@services/token.service'

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await login(req.body)
    if (result.erros && result.erros.length > 0) {
      sendResponse(res, 400, {
        message: 'ERROR',
        errors: result.erros
      })
      return
    }
    sendResponse(res, 200, {
      message: messages.success.LOGIN_SUCCESS,
      data: result
    })
  } catch (error) {
    sendResponse(res, 500, {
      message: messages.errors.INTERNAL_SERVER_ERROR,
      error
    })
  }
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await register(req.body)
    if (result.erros && result.erros.length > 0) {
      sendResponse(res, 400, {
        message: 'ERROR',
        errors: result.erros
      })
      return
    }
    sendResponse(res, 200, {
      message: messages.success.REGISTER_SUCCESS,
      data: result.email
    })
  } catch (error) {
    sendResponse(res, 500, {
      message: messages.errors.INTERNAL_SERVER_ERROR,
      error
    })
  }
}

const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendResponse(res, 400, { message: messages.errors.TOKEN_REQUIRED })
    return
  }
  const token = authHeader.split(' ')[1]

  try {
    const result = await refeshToken(token)

    sendResponse(res, 200, {
      message: messages.success.REFRESH_TOKEN_SUCCESS,
      data: result
    })
  } catch (error) {
    console.log(error)
    sendResponse(res, 500, {
      message: messages.errors.INTERNAL_SERVER_ERROR,
      error
    })
  }
}

export { loginUser, registerUser, refreshAccessToken }
