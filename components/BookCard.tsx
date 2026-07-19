'use client'
import Link from 'next/link'

type Props = {
  title: string
  author: string
  price: number
  slug: string
  cover?: string
}

export default function BookCard({ title, author, price, slug, cover }: Props){
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Link href={`/book/${slug}`} className="block">
        <div className="h-48 bg-slate-200 dark:bg-slate-700" style={{backgroundImage: `url(${cover || '/placeholder-book.jpg'})`, backgroundSize:'cover'}}></div>
      </Link>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-1">{title}</h3>
        <div className="text-xs text-slate-500 mb-3">{author}</div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">₹{price.toFixed(2)}</div>
          <Link href={`/book/${slug}`} className="text-sm text-blue-600">View</Link>
        </div>
      </div>
    </article>
  )
}
