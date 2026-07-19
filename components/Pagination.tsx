'use client'
import Link from 'next/link'

export default function Pagination({ current, total, basePath = '/' }: { current: number; total: number; basePath?: string }){
  const pages = []
  for (let i = 1; i <= total; i++) pages.push(i)

  return (
    <nav className="flex items-center gap-2">
      {pages.map(p => (
        <Link key={p} href={`${basePath}?page=${p}`} className={`px-3 py-1 rounded ${p===current? 'bg-blue-600 text-white':'border'}`}>{p}</Link>
      ))}
    </nav>
  )
}
