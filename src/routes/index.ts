import { Router } from 'express'
import authRoutes from '@routes/auth'
import userRoutes from '@routes/users'
import recoveryRoutes from '@routes/recovery'
//import authenticateToken from '@middlewares/authMiddleware'

const router = Router()
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/recovery', recoveryRoutes)
//router.post('/me', authenticateToken, registerUser)

router.get('/', (_req, res) => {
  res.status(200).json({ message: 'API funcionando!' })
})

export default router
