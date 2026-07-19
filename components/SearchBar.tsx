'use client'
import { useState } from 'react'

export default function SearchBar(){
  const [q, setQ] = useState('')

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label className="relative block">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Search books, authors, ISBN..."
          className="w-full rounded-lg border px-4 py-3"
        />
      </label>
    </div>
  )
}
