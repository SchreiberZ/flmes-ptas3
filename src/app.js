import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

// Libera CORS especificamente para o front Vite do PTAC4
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
)

app.use(express.json())

app.use(routes)

app.use((req, res) => {
  res.status(404).json({
    type: 'NOT_FOUND',
    message: 'Rota não encontrada.'
  })
})

app.use(errorHandler)

export default app
