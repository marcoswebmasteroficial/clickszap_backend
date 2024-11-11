import { User } from '@models/User'
import jwt, { JwtPayload } from 'jsonwebtoken'

const secretAuth = process.env.JWT_SECRET as string
const secretRecovery = process.env.JWT_REFRESH_SECRET as string
const secretRefresh = process.env.JWT_REFRESH_SECRET as string

if (!secretAuth || !secretRecovery || !secretRefresh) {
  throw new Error('JWT_SECRET ou JWT_REFRESH_SECRET não estão definidos')
}

const generateAccessToken = (
  id: string,
  type: string = 'auth',
  expire?: string
): string => {
  let secret

  // Seleciona a chave secreta com base no tipo do token
  switch (type) {
    case 'auth':
      secret = secretAuth
      break
    case 'recovery':
      secret = secretRecovery
      break
    case 'refresh':
      secret = secretRefresh
      break
    default:
      throw new Error('Tipo de token desconhecido')
  }

  const payload = { id, type }
  return jwt.sign(payload, secret, { expiresIn: expire || '1h' })
}
const decodeAccessToken = (
  token: string,
  expectedType: string
): JwtPayload | null => {
  let secret

  // Seleciona a chave secreta com base no tipo de token
  switch (expectedType) {
    case 'auth':
      secret = secretAuth
      break
    case 'recovery':
      secret = secretRecovery
      break
    case 'refresh':
      secret = secretRefresh
      break
    default:
      console.error('Tipo de token desconhecido')
      return null
  }

  try {
    // Decodifica e valida o token
    const decoded = jwt.verify(token, secret) as JwtPayload

    // Verifica se o tipo do token corresponde ao esperado
    if (decoded.type !== expectedType) {
      throw new Error('Tipo de token inválido')
    }

    return decoded // Retorna o payload do token
  } catch (error) {
    console.error('Erro ao decodificar token:', error)
    return null // Retorna null em caso de erro
  }
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString() // Gera um OTP de 6 dígitos
}
const verifyToken = (token: string, expectedType: string): User | null => {
  let secret

  // Seleciona a chave secreta com base no tipo de token
  switch (expectedType) {
    case 'auth':
      secret = secretAuth
      break
    case 'recovery':
      secret = secretRecovery
      break
    case 'refresh':
      secret = secretRefresh
      break
    default:
      console.error('Tipo de token desconhecido')
      return null
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, secret) as JwtPayload

    // Verifica se o tipo do token corresponde ao esperado
    if (decoded.type !== expectedType) {
      throw new Error('Tipo de token inválido')
    }

    return decoded as User // Retorna o payload do token
  } catch (_error) {
    return null // Retorna null se o token for inválido ou expirar
  }
}

export { generateAccessToken, decodeAccessToken, generateOTP, verifyToken }
