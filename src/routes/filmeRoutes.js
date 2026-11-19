import { Router } from 'express'
import * as filmeController from '../controllers/filmeController.js'
import { validarObjectId } from '../middlewares/validarId.js'

const router = Router()

router.get('/', filmeController.listar)
router.get('/:id', validarObjectId, filmeController.buscarPorId)
router.post('/', filmeController.criar)
router.put('/:id', validarObjectId, filmeController.atualizar)
router.delete('/:id', validarObjectId, filmeController.remover)

export default router
