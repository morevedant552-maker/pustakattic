'use client'
import Link from 'next/link'

export default function SimilarBooks({ books }: { books: any[] }){
  if (!books || books.length === 0) return null
  return (
    <div className="border rounded p-4">
      <h4 className="font-medium mb-3">Similar books</h4>
      <div className="grid grid-cols-2 gap-3">
        {books.slice(0,4).map(b=> (
          <Link key={b.id} href={`/book/${b.slug}`} className="flex items-center gap-3">
            <img src={b.coverImage || '/placeholder-book.jpg'} className="w-12 h-16 object-cover rounded" />
            <div className="text-sm">{b.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
