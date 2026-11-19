import * as filmeService from '../services/filmeService.js'
import { criarFilmeSchema, atualizarFilmeSchema } from '../schemas/filmeSchema.js'

export async function listar(req, res, next) {
  try {
    const resultado = await filmeService.listarFilmes(req.query)
    return res.status(200).json(resultado)
  } catch (error) {
    next(error)
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const filme = await filmeService.buscarFilmePorId(req.params.id)
    return res.status(200).json(filme)
  } catch (error) {
    next(error)
  }
}

export async function criar(req, res, next) {
  try {
    const dadosValidados = criarFilmeSchema.parse(req.body)
    const novoFilme = await filmeService.criarFilme(dadosValidados)
    return res.status(201).json(novoFilme)
  } catch (error) {
    next(error)
  }
}

export async function atualizar(req, res, next) {
  try {
    const dadosValidados = atualizarFilmeSchema.parse(req.body)
    const atualizado = await filmeService.atualizarFilme(req.params.id, dadosValidados)
    return res.status(200).json(atualizado)
  } catch (error) {
    next(error)
  }
}

export async function remover(req, res, next) {
  try {
    await filmeService.removerFilme(req.params.id)
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
