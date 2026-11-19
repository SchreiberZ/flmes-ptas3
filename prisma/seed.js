import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const filmesIniciais = [
  { titulo: 'Interestelar', genero: 'Ficção Científica', ano: 2014 },
  { titulo: 'O Poderoso Chefão', genero: 'Drama', ano: 1972 },
  { titulo: 'Matrix', genero: 'Ficção Científica', ano: 1999 },
  { titulo: 'Pulp Fiction', genero: 'Crime', ano: 1994 },
  { titulo: 'Gladiador', genero: 'Ação', ano: 2000 },
  { titulo: 'Cidade de Deus', genero: 'Drama', ano: 2002 },
  { titulo: 'A Origem', genero: 'Ficção Científica', ano: 2010 },
  { titulo: 'O Senhor dos Anéis: O Retorno do Rei', genero: 'Fantasia', ano: 2003 },
  { titulo: 'Clube da Luta', genero: 'Drama', ano: 1999 },
  { titulo: 'Forrest Gump', genero: 'Drama', ano: 1994 }
]

async function main() {
  console.log('Iniciando povoamento do banco...')
  await prisma.filme.deleteMany({})

  for (const filme of filmesIniciais) {
    await prisma.filme.create({ data: filme })
  }

  console.log('Seed concluído com sucesso: 10 filmes inseridos.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })