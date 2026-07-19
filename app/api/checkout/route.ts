import { prisma } from '../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request){
  try{
    const body = await req.json()
    const { userEmail } = body
    if (!userEmail) return NextResponse.json({ error: 'userEmail required' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email: userEmail } })
    if (!user) return NextResponse.json({ error: 'user not found' }, { status: 404 })

    const cart = await prisma.cart.findFirst({ where: { userId: user.id }, include: { items: { include: { book: true } } } })
    if (!cart || cart.items.length === 0) return NextResponse.json({ error: 'cart empty' }, { status: 400 })

    const subtotal = cart.items.reduce((s, it) => s + (it.book.price * it.quantity), 0)
    const shipping = subtotal > 499 ? 0 : 49
    const tax = +(subtotal * 0.05).toFixed(2)
    const total = +(subtotal + shipping + tax).toFixed(2)

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        subtotal,
        shipping,
        tax,
        total,
        items: { create: cart.items.map(i=> ({ bookId: i.bookId, quantity: i.quantity, unitPrice: i.book.price, total: i.book.price * i.quantity })) }
      },
      include: { items: true }
    })

    // clear cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })

    return NextResponse.json({ data: order })
  } catch (err){
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
}
