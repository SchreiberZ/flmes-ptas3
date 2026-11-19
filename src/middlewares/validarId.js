export function validarObjectId(req, res, next) {
  const { id } = req.params
  const objectIdRegex = /^[0-9a-fA-F]{24}$/

  if (!objectIdRegex.test(id)) {
    return res.status(400).json({
      type: 'VALIDATION_ERROR',
      message: 'O ID fornecido não é um ObjectId válido de 24 caracteres hexadecimais.'
    })
  }

  next()
}
