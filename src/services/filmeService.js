import prisma from '../config/prisma.js'

function formatarDTO(filme) {
  if (!filme) return null
  return {
    id: filme.id,
    titulo: filme.titulo,
    genero: filme.genero,
    ano: filme.ano,
    createdAt: filme.createdAt,
    updatedAt: filme.updatedAt
  }
}

export async function listarFilmes({ page = 1, limit = 10, sort = '-createdAt', q = '' }) {
  const pagina = Math.max(1, parseInt(page, 10))
  const limite = Math.max(1, parseInt(limit, 10))
  const pular = (pagina - 1) * limite

  const where = {
    deletedAt: null,
    ...(q && {
      OR: [
        { titulo: { contains: q, mode: 'insensitive' } },
        { genero: { contains: q, mode: 'insensitive' } }
      ]
    })
  }

  let orderBy = { createdAt: 'desc' }
  if (sort) {
    const decrescente = sort.startsWith('-')
    const campo = decrescente ? sort.substring(1) : sort
    if (['titulo', 'genero', 'ano', 'createdAt'].includes(campo)) {
      orderBy = { [campo]: decrescente ? 'desc' : 'asc' }
    }
  }

  const [total, filmes] = await Promise.all([
    prisma.filme.count({ where }),
    prisma.filme.findMany({
      where,
      skip: pular,
      take: limite,
      orderBy
    })
  ])

  const totalPages = Math.ceil(total / limite) || 1

  return {
    data: filmes.map(formatarDTO),
    meta: {
      total,
      page: pagina,
      limit: limite,
      totalPages
    }
  }
}

export async function buscarFilmePorId(id) {
  const filme = await prisma.filme.findFirst({
    where: { id, deletedAt: null }
  })

  if (!filme) {
    const erro = new Error('Filme não encontrado.')
    erro.status = 404
    erro.type = 'NOT_FOUND'
    throw erro
  }

  return formatarDTO(filme)
}

export async function criarFilme(dados) {
  const novoFilme = await prisma.filme.create({
    data: dados
  })

  return formatarDTO(novoFilme)
}

export async function atualizarFilme(id, dados) {
  await buscarFilmePorId(id)

  const atualizado = await prisma.filme.update({
    where: { id },
    data: dados
  })

  return formatarDTO(atualizado)
}

export async function removerFilme(id) {
  await buscarFilmePorId(id)

  await prisma.filme.update({
    where: { id },
    data: { deletedAt: new Date() }
  })
}
