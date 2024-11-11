export const messages = {
  success: {
    REGISTER_SUCCESS: 'Usuário cadastrado com sucesso!',
    LOGIN_SUCCESS: 'Login realizado com sucesso!',
    USER_UPDATED_SUCCESS: 'Usuário atualizado com sucesso!',
    REFRESH_TOKEN_SUCCESS: 'Token de acesso atualizado com sucesso!',
    RECOVERY_EMAIL_SENT:
      'E-mail enviado! Confira sua caixa de entrada para redefinir sua senha. Se não encontrar, verifique também a pasta de spam',
    VALID_TOKEN: 'Token válido.',
    PASSWORD_RESET_SUCCESS: 'Sua senha foi redefinida com sucesso!'
  },
  errors: {
    USER_NOT_FOUND: 'Usuário não encontrado',
    INVALID_CREDENTIALS: 'Credenciais inválidas',
    EMAIL_ALREADY_REGISTERED: 'E-mail já cadastrado',
    USERNAME_ALREADY_IN_USE: 'Nome de usuário já em uso.',
    INVALID_EMAIL: 'Email inválido',
    EMPTY_PASSWORD: 'A senha não pode estar vazia',
    USER_BLOCKED: 'Usuário bloqueado. Entre em contato com o suporte.',
    PASSWORD_TOO_SHORT: 'A senha deve ter pelo menos 8 caracteres.',
    PASSWORD_TOO_WEAK:
      'A senha deve ter pelo menos 8 caracteres, conter letras maiúsculas, minúsculas, números e caracteres especiais.',
    TOKEN_EXPIRED: 'O token de autenticação expirou.',
    TOKEN_INVALID: 'Token de autenticação inválido.',
    USER_NOT_AUTHORIZED: 'Usuário não autorizado para esta ação.',
    ACCOUNT_NOT_ACTIVE:
      'Conta não ativada. Verifique seu e-mail para ativação.',
    EMAIL_NOT_REGISTERED: 'Este e-mail não está registrado.',
    ACTION_NOT_ALLOWED: 'Ação não permitida.',
    INTERNAL_SERVER_ERROR:
      'Erro interno do servidor. Tente novamente mais tarde.',
    REQUIRED_FIELD: 'O campo {text} é obrigatório.',
    INVALID_FIELD: 'O campo {text} é inválido.',
    INVALID_REFRESH_TOKEN: 'O token de refresh é inválido.',
    TOKEN_REQUIRED: 'O token é obrigatório.',
    EMAIL_SEND_FAILED: 'Falha ao enviar o e-mail. Tente novamente mais tarde.',
    INVALID_EMAIL_FORMAT:
      'O e-mail deve estar em um formato válido, como exemplo@dominio.com.',
    PASSWORD_RECOVERY_REQUEST_NOT_FOUND:
      'Não há nenhum pedido de recuperação de senha em andamento. Por favor, inicie o processo para solicitar a recuperação.'
  },
  general: {
    USERS_QUERY_DESCRIPTION: 'Retorna todos os usuários',
    REGISTER_USER_DESCRIPTION: 'Registrar um novo usuário',
    LOGIN_USER_DESCRIPTION: 'Realizar login de um usuário'
  }
}
export const formatMessage = (
  message: string,
  replacements: { [key: string]: string }
): string => {
  return message.replace(/{(\w+)}/g, (_, key) => replacements[key] || '')
}
