import express from 'express'
import 'module-alias/register';
import cors from 'cors'
import logger from '@utils/logger'
import { AppDataSource } from '@config/database'
import routes from '@routes/index'
import { errorHandler } from '@middlewares/errorHandler'
const app = express()

app.use(cors())
app.use(errorHandler)
app.use(express.json())
app.use('/api', routes)
async function initializeServer() {
  try {
    const PORT = process.env.PORT || 4000
    await AppDataSource.initialize()
    app.listen(PORT, () => {
      logger.info(`🚀 Server started on http://localhost:${PORT}`)
    })
  } catch (error) {
    logger.error(`Erro ao iniciar o servidor: ${error}`)
    process.exit(1)
  }
}
initializeServer()
