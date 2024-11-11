import express from 'express'
import { me } from '@controllers/userController'
import authenticateToken from '@middlewares/authMiddleware'
const router = express.Router()

router.get('/me', authenticateToken, me)
router.post('/', (_req, res) => {
  // Lógica para criar um novo usuário
  res.status(201).send('Usuário criado')
})

export default router
