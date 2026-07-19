import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || undefined
  const take = Number(url.searchParams.get('limit') || '12')

  const where = q
    ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { isbn: { contains: q } },
        ],
      }
    : {}

  const books = await prisma.book.findMany({
    where,
    take,
    include: { author: true, publisher: true },
  })

  return NextResponse.json({ data: books })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const book = await prisma.book.create({ data: body })
    return NextResponse.json(book)
  } catch (err) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
}
