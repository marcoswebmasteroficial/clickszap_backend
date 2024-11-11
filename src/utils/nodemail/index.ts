import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import { messages } from '@utils/messages'

interface RecoveryEmailOptions {
  to: string
  subject: string
  otpCode: string
}

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendRecoveryEmail = async (
  options: RecoveryEmailOptions
): Promise<void> => {
  const { to, subject, otpCode } = options

  const templatePath = path.join(__dirname, 'template', 'email-template.hbs')

  const source = fs.readFileSync(templatePath, 'utf8')
  const template = handlebars.compile(source)
  const html = template({ otpCode })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (_error) {
    throw new Error(messages.errors.EMAIL_SEND_FAILED)
  }
}
