import { prisma } from '../../../lib/prisma'
import BookGallery from '../../../components/BookGallery'
import StickyBuyBar from '../../../components/StickyBuyBar'
import { generateOpenGraph } from '../../../utils/seo'

type PageProps = { params: { slug: string } }

export async function generateMetadata({ params }: PageProps) {
  const book = await prisma.book.findUnique({ where: { slug: params.slug } })
  if (!book) return {}
  return generateOpenGraph({ title: book.title, description: book.description.slice(0,160), slug: book.slug })
}

export default async function BookPage({ params }: PageProps){
  const book = await prisma.book.findUnique({
    where: { slug: params.slug },
    include: { author: true, publisher: true, categories: true, reviews: true }
  })

  if (!book) {
    return <div className="container mx-auto px-6 py-20">Book not found</div>
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookGallery images={[...(book.gallery || []), book.coverImage || '/placeholder-book.jpg']} />
          <h1 className="text-2xl font-semibold mt-6">{book.title}</h1>
          <div className="text-sm text-slate-600 mt-2">By {book.author?.name || 'Unknown'}</div>
          <div className="mt-4 text-slate-700 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: book.description }} />

          <section className="mt-8">
            <h3 className="font-medium">Details</h3>
            <ul className="mt-2 text-sm text-slate-600">
              <li>ISBN: {book.isbn}</li>
              <li>Language: {book.language}</li>
              <li>Pages: {book.pages || '—'}</li>
              <li>Publisher: {book.publisher?.name || '—'}</li>
              <li>Publication Date: {book.publicationDate ? new Date(book.publicationDate).toLocaleDateString() : '—'}</li>
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="font-medium">Reviews</h3>
            <div className="mt-4 space-y-4">
              {book.reviews.length === 0 && <div className="text-sm text-slate-500">No reviews yet.</div>}
              {book.reviews.map(r=> (
                <div key={r.id} className="border rounded p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.title || 'Review'}</div>
                    <div className="text-sm text-slate-500">{r.rating} ★</div>
                  </div>
                  <div className="text-sm text-slate-600 mt-2">{r.body}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <div className="text-2xl font-semibold">₹{book.price.toFixed(2)}</div>
            {book.mrp && <div className="text-sm text-slate-500 line-through">₹{book.mrp.toFixed(2)}</div>}
            <div className="mt-4 text-sm text-slate-600">Stock: {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}</div>

            <div className="mt-6">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-md" onClick={() => { /* prefer StickyBuyBar for action */ }}>Buy Now</button>
            </div>

            <div className="mt-4 text-xs text-slate-500">Delivery estimate: 3-7 business days</div>
            <div className="mt-2 text-xs text-slate-500">Return policy: 7-day returns on eligible books</div>
          </div>
        </aside>
      </div>

      <StickyBuyBar bookId={book.id} price={book.price} title={book.title} slug={book.slug} available={book.stock>0} />
    </div>
  )
}
