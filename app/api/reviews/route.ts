import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req: Request){
  try{
    const url = new URL(req.url)
    const bookId = url.searchParams.get('bookId')
    if (!bookId) return NextResponse.json({ error: 'bookId required' }, { status: 400 })

    const reviews = await prisma.review.findMany({ where: { bookId }, orderBy: { createdAt: 'desc' }, include: { user: true } })
    return NextResponse.json({ data: reviews })
  } catch (err){
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

export async function POST(req: Request){
  try{
    const body = await req.json()
    const { bookId, rating, title, body: text } = body
    if (!bookId || !rating || !text) return NextResponse.json({ error: 'missing' }, { status: 400 })

    // Use demo user for now; replace with authenticated user in production
    const user = await prisma.user.findUnique({ where: { email: 'demo@pustakattick.com' } })
    if (!user) return NextResponse.json({ error: 'user not found' }, { status: 404 })

    const review = await prisma.review.create({ data: { bookId, rating: Number(rating), title: title || null, body: text, userId: user.id } })

    // update book aggregates
    const agg = await prisma.review.aggregate({ where: { bookId }, _avg: { rating: true }, _count: { _all: true } })
    const avg = agg._avg.rating || 0
    const cnt = agg._count._all || 0
    await prisma.book.update({ where: { id: bookId }, data: { rating: avg, totalReviews: cnt } })

    return NextResponse.json({ data: review })
  } catch (err){
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
