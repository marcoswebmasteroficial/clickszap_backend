import {
  recoveryPass,
  resetPassowrd,
  verifyCodeOtp
} from '@controllers/auth.recovery.controller'

import express from 'express'
const router = express.Router()

router.post('/', recoveryPass)
router.post('/verify', verifyCodeOtp)
router.post('/reset', resetPassowrd)

export default router
