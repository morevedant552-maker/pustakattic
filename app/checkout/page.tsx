'use client'
import { useEffect, useState } from 'react'

export default function CheckoutPage(){
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const userEmail = 'demo@pustakattick.com'

  async function place(){
    setLoading(true)
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ userEmail }) })
    const data = await res.json()
    setOrder(data.data)
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border rounded p-6">Shipping address and payment UI placeholder (implement NextAuth & saved addresses)</div>
        </div>
        <aside className="border rounded p-6">
          <div className="text-sm text-slate-500">Order summary (demo)</div>
          <div className="mt-4">
            <button onClick={place} disabled={loading} className="w-full px-4 py-3 bg-blue-600 text-white rounded">{loading? 'Placing...': 'Place Order (Demo)'}</button>
          </div>
          {order && <div className="mt-4 text-sm">Order placed. ID: {order.id}</div>}
        </aside>
      </div>
    </div>
  )
}
