import {
  loginUser,
  refreshAccessToken,
  registerUser
} from '@controllers/auth.controller'
import express from 'express'
const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/refresh', refreshAccessToken)
export default router
