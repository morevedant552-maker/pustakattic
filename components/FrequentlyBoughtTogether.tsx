'use client'
import { useEffect, useState } from 'react'

export default function FrequentlyBoughtTogether({ bookId }: { bookId: string }){
  const [items, setItems] = useState<any[]>([])

  useEffect(()=>{
    // Naive placeholder: fetch a few books to show as cross-sell. In production, replace with real associations.
    fetch('/api/books?limit=4').then(r=>r.json()).then(j=> setItems(j.data.filter((b:any)=> b.id !== bookId)))
  }, [bookId])

  const total = items.reduce((s:any, it:any)=> s + it.price, 0)

  return (
    <div className="border rounded p-4">
      <h4 className="font-medium mb-3">Frequently bought together</h4>
      <div className="flex gap-3">
        {items.map(i=> (
          <div key={i.id} className="w-20">
            <img src={i.coverImage || '/placeholder-book.jpg'} className="w-full h-28 object-cover rounded" />
            <div className="text-xs mt-1">₹{i.price.toFixed(0)}</div>
          </div>
        ))}
      </div>
      {items.length>0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">Total: ₹{total.toFixed(2)}</div>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded">Add all to cart</button>
        </div>
      )}
    </div>
  )
}
