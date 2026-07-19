import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const url = new URL(req.url)
  const userEmail = url.searchParams.get('userEmail')
  if (!userEmail) return NextResponse.json({ error: 'userEmail required' }, { status: 400 })
  const user = await prisma.user.findUnique({ where: { email: userEmail }, include: { cart: { include: { items: true } } } })
  if (!user) return NextResponse.json({ data: { items: [] } })

  const cart = await prisma.cart.findFirst({ where: { userId: user.id }, include: { items: { include: { book: true } } } })
  if (!cart) return NextResponse.json({ data: { items: [] } })

  return NextResponse.json({ data: cart })
}

export async function POST(req: Request){
  try{
    const body = await req.json()
    const { userEmail, bookId, quantity = 1 } = body
    if (!userEmail || !bookId) return NextResponse.json({ error: 'missing' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email: userEmail } })
    if (!user) return NextResponse.json({ error: 'user not found' }, { status: 404 })

    let cart = await prisma.cart.findFirst({ where: { userId: user.id } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: user.id } })
    }

    const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, bookId } })
    if (existing){
      await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + quantity } })
    } else {
      await prisma.cartItem.create({ data: { cartId: cart.id, bookId, quantity } })
    }

    const updated = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: { include: { book: true } } } })
    return NextResponse.json({ data: updated })

  } catch (err){
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
}

export async function DELETE(req: Request){
  try{
    const url = new URL(req.url)
    const itemId = url.searchParams.get('itemId')
    if (!itemId) return NextResponse.json({ error: 'itemId required' }, { status: 400 })

    await prisma.cartItem.delete({ where: { id: itemId } })
    return NextResponse.json({ ok: true })
  } catch (err){
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
}
