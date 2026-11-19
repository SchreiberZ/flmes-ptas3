import { Router } from 'express'
import filmeRoutes from './filmeRoutes.js'

const router = Router()

router.get('/recuperacao', (req, res) => {
  res.json({ programar: 'mudou minha vida' })
})

router.use('/api/v1/filmes', filmeRoutes)

export default router
