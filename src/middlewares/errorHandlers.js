import { ZodError } from 'zod'

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      type: 'VALIDATION_ERROR',
      message: 'Dados inválidos fornecidos no corpo da requisição.',
      details: err.errors.map((e) => ({
        campo: e.path.join('.'),
        erro: e.message
      }))
    })
  }

  if (err.status) {
    return res.status(err.status).json({
      type: err.type || 'CLIENT_ERROR',
      message: err.message
    })
  }

  console.error(err)
  return res.status(500).json({
    type: 'INTERNAL_SERVER_ERROR',
    message: 'Ocorreu um erro interno no servidor.'
  })
}
