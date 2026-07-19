'use client'
import { useState, useEffect, useRef } from 'react'

export default function SearchAutocomplete(){
  const [q, setQ] = useState('')
  const [results, setResults] = useState<any[]>([])
  const timer = useRef<any>()

  useEffect(()=>{
    if (!q) { setResults([]); return }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async ()=>{
      try{
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=6`)
        const j = await res.json()
        setResults(j.data || [])
      } catch (err){
        setResults([])
      }
    }, 250)
  }, [q])

  return (
    <div className="relative max-w-md">
      <input value={q} onChange={(e)=> setQ(e.target.value)} placeholder="Search by title, author, ISBN..." className="w-full border rounded px-3 py-2" />
      {results.length>0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-20">
          {results.map(r=> (
            <a key={r.id} href={`/book/${r.slug}`} className="block px-3 py-2 hover:bg-slate-50">{r.title}</a>
          ))}
        </div>
      )}
    </div>
  )
}
