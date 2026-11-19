import { z } from 'zod'

export const criarFilmeSchema = z.object({
  titulo: z
    .string({ required_error: 'O título é obrigatório.' })
    .min(1, 'O título não pode ser vazio.'),
  genero: z
    .string({ required_error: 'O gênero é obrigatório.' })
    .min(1, 'O gênero não pode ser vazio.'),
  ano: z
    .number({ required_error: 'O ano é obrigatório.', invalid_type_error: 'O ano deve ser um número.' })
    .int('O ano deve ser um número inteiro.')
    .min(1895, 'Ano inválido (mínimo 1895).')
    .max(2030, 'Ano inválido (máximo 2030).')
})

export const atualizarFilmeSchema = criarFilmeSchema.partial()
