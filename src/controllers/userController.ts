import { Response } from 'express'
import { AppDataSource } from '@config/database'
import { User } from '@models/User'
import sendResponse from '@utils/response'
import { messages } from '@utils/messages'
import { CustomRequest } from 'types/express'

const me = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ id: req.user?.id })
    if (!user) {
      sendResponse(res, 401, { message: messages.errors.USER_NOT_FOUND })
      return
    }
    sendResponse(res, 200, {
      data: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    sendResponse(res, 500, {
      message: messages.errors.INTERNAL_SERVER_ERROR,
      error
    })
  }
}

export { me }
