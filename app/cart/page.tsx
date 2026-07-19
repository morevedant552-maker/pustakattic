'use client'
import { useEffect, useState } from 'react'

export default function CartPage(){
  const [cart, setCart] = useState<any>(null)
  const userEmail = 'demo@pustakattick.com'

  async function load(){
    const res = await fetch(`/api/cart?userEmail=${encodeURIComponent(userEmail)}`)
    const data = await res.json()
    setCart(data.data)
  }

  useEffect(()=>{ load() }, [])

  if (!cart) return <div className="container mx-auto px-6 py-12">Loading...</div>

  const subtotal = cart.items.reduce((s:any, it:any)=> s + (it.book.price * it.quantity), 0)

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((it:any)=> (
            <div key={it.id} className="flex items-center gap-4 border p-4 rounded">
              <img src={it.book.coverImage || '/placeholder-book.jpg'} className="w-20 h-28 object-cover" />
              <div>
                <div className="font-medium">{it.book.title}</div>
                <div className="text-sm text-slate-500">Qty: {it.quantity}</div>
              </div>
              <div className="ml-auto font-semibold">₹{(it.book.price * it.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <aside className="border rounded p-6">
          <div className="text-sm text-slate-500">Subtotal</div>
          <div className="text-2xl font-semibold">₹{subtotal.toFixed(2)}</div>
          <a href="/checkout" className="mt-6 inline-block w-full text-center px-4 py-3 bg-blue-600 text-white rounded">Proceed to Checkout</a>
        </aside>
      </div>
    </div>
  )
}
