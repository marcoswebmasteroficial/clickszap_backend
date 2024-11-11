import { AppDataSource } from '@config/database'
import { User } from '@models/User'
import { sendRecoveryEmail } from '@utils/nodemail'
import { formatMessage, messages } from '@utils/messages'

import { generateAccessToken, generateOTP, verifyToken } from '@utils/jwt'
import { Otp } from '@models/Otp'
import { validatePasswordStrength } from '@utils/validators'
import hashPassword from '@utils/hash'

const recoveryPassword = async ({ email }: { email: string }) => {
  const erros: string[] = []
  const user = await AppDataSource.getRepository(User).findOne({
    where: { email },
    select: ['id', 'email']
  })
  if (!user) {
    erros.push(messages.errors.USER_NOT_FOUND)
    return { erros }
  }
  const existingOtp = await AppDataSource.getRepository(Otp).findOne({
    where: { user }
  })

  const otpCode = generateOTP()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos de expiração
  const token = generateAccessToken(user.id, 'recovery', '5h')
  if (existingOtp) {
    // Atualiza o OTP existente
    existingOtp.code = otpCode
    existingOtp.expiresAt = expiresAt
    await AppDataSource.getRepository(Otp).save(existingOtp)
  } else {
    // Cria um novo OTP
    const otp = new Otp()
    otp.code = otpCode
    otp.expiresAt = expiresAt
    otp.user = user

    await AppDataSource.getRepository(Otp).save(otp)
  }

  try {
    await sendRecoveryEmail({
      to: email,
      subject: 'Recuperação de Senha',
      otpCode
    })
  } catch {
    erros.push(messages.errors.EMAIL_SEND_FAILED)
    erros.push('Tente novamente mais tarde ou entre em contato com o suporte')
  }
  return { token, erros }
}

const verifyOtp = async (token: string, otp: string) => {
  const erros: string[] = []
  const userRepository = AppDataSource.getRepository(User)
  const optRepository = AppDataSource.getRepository(Otp)
  const check = verifyToken(token, 'recovery')
  if (!check) {
    erros.push('Token inválido ou expirado')
    return { erros }
  }

  const user = await userRepository.findOne({
    where: { id: check.id },
    select: ['id']
  })

  const userOtp = await optRepository.findOne({
    where: { user: { id: user?.id }, code: otp }
  })

  if (!userOtp) {
    erros.push('Código OTP incorreto ou não encontrado para o usuário')
  } else if (userOtp.expiresAt < new Date()) {
    erros.push('Código OTP expirado')
  }

  return { erros }
}

const resetPassword = async (token: string, newPassword: string) => {
  const erros: string[] = []
  const userRepository = AppDataSource.getRepository(User)
  const optRepository = AppDataSource.getRepository(Otp)

  const check = verifyToken(token, 'recovery')
  if (!check) {
    erros.push(messages.errors.TOKEN_EXPIRED)
    return { erros }
  }
  const user = await userRepository.findOne({
    where: { id: check.id },
    select: ['id']
  })

  if (!user) {
    erros.push(messages.errors.USER_NOT_FOUND)
    return { erros }
  }

  const otp = await optRepository.findOne({
    where: { user: { id: user?.id } }
  })
  if (!otp) {
    erros.push(messages.errors.PASSWORD_RECOVERY_REQUEST_NOT_FOUND)
    return { erros }
  }
  const hashedPassword = await hashPassword(newPassword)
  if (!hashedPassword) {
    erros.push(formatMessage(messages.errors.REQUIRED_FIELD, { text: 'Senha' }))
  } else if (!validatePasswordStrength(newPassword)) {
    erros.push(messages.errors.PASSWORD_TOO_WEAK)
  }
  user.password = hashedPassword
  user.updatedAt = new Date()
  await userRepository.save(user)
  await optRepository.delete({ user: { id: user.id } })

  return { erros }
}

export { recoveryPassword, verifyOtp, resetPassword }
