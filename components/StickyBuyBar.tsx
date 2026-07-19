'use client'
import { useState } from 'react'
import { useCart } from '../store/cart'

export default function StickyBuyBar({ bookId, price, title, slug, available }: { bookId: string; price: number; title: string; slug: string; available: boolean }){
  const add = useCart((s)=>s.add)
  const [qty, setQty] = useState(1)

  return (
    <div className="fixed bottom-4 left-0 right-0 pointer-events-none">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-800 border rounded-lg p-4 flex items-center justify-between shadow-lg pointer-events-auto">
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-slate-500">₹{price.toFixed(2)}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded">
              <button className="px-3" onClick={()=> setQty(q=> Math.max(1, q-1))}>-</button>
              <div className="px-3">{qty}</div>
              <button className="px-3" onClick={()=> setQty(q=> q+1)}>+</button>
            </div>
            <button disabled={!available} className={`px-4 py-2 rounded-md text-white ${available? 'bg-blue-600':'bg-slate-400'}`} onClick={()=> add(bookId, qty)}>Add to cart</button>
            <a href="/checkout" className="px-4 py-2 rounded-md border">Checkout</a>
          </div>
        </div>
      </div>
    </div>
  )
}
