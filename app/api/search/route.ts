import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') || undefined
  const take = Number(url.searchParams.get('limit') || '8')

  const where = q
    ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { isbn: { contains: q } },
          { 'author': { name: { contains: q, mode: 'insensitive' } } }
        ] as any
      }
    : {}

  const books = await prisma.book.findMany({
    where,
    take,
    select: { id: true, title: true, slug: true, coverImage: true }
  })

  return NextResponse.json({ data: books })
}
