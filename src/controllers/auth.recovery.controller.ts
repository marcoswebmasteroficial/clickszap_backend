import sendResponse from '@utils/response'
import { Request, Response } from 'express'
import { messages } from '@utils/messages'
import {
  recoveryPassword,
  resetPassword,
  verifyOtp
} from '@services/auth.recovery.service'

const recoveryPass = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await recoveryPassword(req.body)
    if (result.erros && result.erros.length > 0) {
      sendResponse(res, 400, {
        message: 'ERROR',
        errors: result.erros
      })
      return
    }
    sendResponse(res, 200, {
      message: messages.success.RECOVERY_EMAIL_SENT,
      data: {
        token: result.token
      }
    })
  } catch (error) {
    sendResponse(res, 500, {
      message: messages.errors.INTERNAL_SERVER_ERROR,
      error
    })
  }
}

const verifyCodeOtp = async (req: Request, res: Response): Promise<void> => {
  const { otp, token } = req.body
  try {
    const result = await verifyOtp(token, otp)
    if (result.erros && result.erros.length > 0) {
      sendResponse(res, 400, {
        message: 'ERROR',
        errors: result.erros
      })
      return
    }
    sendResponse(res, 200, {})
  } catch (error) {
    sendResponse(res, 500, {
      message: messages.errors.INTERNAL_SERVER_ERROR,
      error
    })
  }
}

const resetPassowrd = async (req: Request, res: Response): Promise<void> => {
  const { newPassword, token } = req.body

  try {
    const result = await resetPassword(token, newPassword)
    console.log(result)
    if (result.erros && result.erros.length > 0) {
      sendResponse(res, 400, {
        message: 'ERROR',
        errors: result.erros
      })
      return
    }
    sendResponse(res, 200, {})
  } catch (error) {
    sendResponse(res, 500, {
      message: messages.errors.INTERNAL_SERVER_ERROR,
      error
    })
  }
}

export { recoveryPass, verifyCodeOtp, resetPassowrd }
