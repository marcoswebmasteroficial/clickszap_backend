import bcrypt from 'bcrypt'
import { generateAccessToken } from '@utils/jwt'
import { AppDataSource } from '@config/database'
import { User } from '@models/User'
import { formatMessage, messages } from '@utils/messages'
import hashPassword from '@utils/hash'
import { validateEmail, validatePasswordStrength } from '@utils/validators'

const login = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const erros: string[] = []
  const repository = AppDataSource.getRepository(User)

  if (!email) {
    erros.push(
      formatMessage(messages.errors.REQUIRED_FIELD, { text: 'E-mail' })
    )
  }
  if (!password) {
    erros.push(formatMessage(messages.errors.REQUIRED_FIELD, { text: 'Senha' }))
  }

  if (erros.length === 0) {
    const user = await repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne()

    if (!user || !(await bcrypt.compare(password, user.password))) {
      erros.push(messages.errors.INVALID_CREDENTIALS)
    } else {
      user.isOnline = true
      await repository.save(user)
      const accessToken = generateAccessToken(user.id, 'auth', '1h')
      const refreshToken = generateAccessToken(user.id, 'refresh', '10min')

      return {
        id: user.id,
        email: user.email,
        accessToken,
        refreshToken,
        erros
      }
    }
  }

  return { erros }
}

const register = async ({
  name,
  email,
  password
}: {
  name: string
  email: string
  password: string
}): Promise<{ email: string; erros: string[] }> => {
  const erros: string[] = []
  const userRepository = AppDataSource.getRepository(User)

  if (!email) {
    erros.push(
      formatMessage(messages.errors.REQUIRED_FIELD, { text: 'E-mail' })
    )
  } else if (!validateEmail(email)) {
    erros.push(messages.errors.INVALID_EMAIL_FORMAT)
  }
  if (!password) {
    erros.push(formatMessage(messages.errors.REQUIRED_FIELD, { text: 'Senha' }))
  } else if (!validatePasswordStrength(password)) {
    erros.push(messages.errors.PASSWORD_TOO_WEAK)
  }
  if (!name) {
    erros.push(formatMessage(messages.errors.REQUIRED_FIELD, { text: 'Nome' }))
  }

  if (erros.length === 0) {
    const existingUser = await userRepository.findOne({
      where: { email },
      select: ['id']
    })

    if (existingUser) {
      erros.push(messages.errors.EMAIL_ALREADY_REGISTERED)
    } else {
      const user = userRepository.create({
        email,
        password: await hashPassword(password),
        name
      })
      await userRepository.save(user)
    }
  }

  return { email, erros }
}

export { login, register }
