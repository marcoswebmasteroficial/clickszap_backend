import { AppDataSource } from '@config/database'
import { User } from '@models/User'
import { decodeAccessToken, generateAccessToken, verifyToken } from '@utils/jwt'
import { messages } from '@utils/messages'

const refeshToken = async (token: string) => {
  const userId = verifyToken(token, 'refresh')
  if (!userId) {
    throw { status: 403, message: messages.errors.INVALID_REFRESH_TOKEN }
  }
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.id = :id', { id: userId.id })
    .addSelect('user.password')
    .getOne()
  if (!user) {
    throw { status: 404, message: messages.errors.USER_NOT_FOUND }
  }
  const accessToken = generateAccessToken(user.id, 'auth', '1h')
  const refreshToken = generateAccessToken(user.id, 'refresh', '10min')
  const newTokenExpires = decodeAccessToken(refreshToken, 'refresh')

  if (!newTokenExpires || typeof newTokenExpires.exp === 'undefined') {
    throw new Error('Data de expiração não encontrada no refresh token.')
  }
  const accessTokenExpires = newTokenExpires.exp * 1000

  return {
    accessToken,
    refreshToken,
    accessTokenExpires
  }
}

export { refeshToken }
