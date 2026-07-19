import { prisma } from '../../../lib/prisma'
import BookGallery from '../../../components/BookGallery'
import StickyBuyBar from '../../../components/StickyBuyBar'
import SimilarBooks from '../../../components/SimilarBooks'
import FrequentlyBoughtTogether from '../../../components/FrequentlyBoughtTogether'
import ReviewForm from '../../../components/ReviewForm'
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

  const similar = await prisma.book.findMany({
    where: {
      OR: [
        { authorId: book.authorId },
        { publisherId: book.publisherId },
        { categories: { some: { id: { in: book.categories.map((c:any)=>c.id) } } } }
      ]
    },
    take: 8
  })

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: book.title,
    image: [ ...(book.gallery || []), book.coverImage || `${process.env.SITE_URL}/placeholder-book.jpg` ],
    description: book.description.slice(0, 300),
    sku: book.sku || book.id,
    isbn: book.isbn,
    brand: { '@type': 'Organization', name: book.publisher?.name || 'PUSTAKATTICK' },
    offers: {
      '@type': 'Offer',
      url: `${process.env.SITE_URL}/book/${book.slug}`,
      priceCurrency: 'INR',
      price: book.price.toFixed(2),
      availability: book.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    aggregateRating: book.totalReviews > 0 ? { '@type': 'AggregateRating', ratingValue: book.rating.toFixed(1), reviewCount: book.totalReviews } : undefined
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

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
              <li>Edition: {book.edition || '—'}</li>
              <li>Publisher: {book.publisher?.name || '—'}</li>
              <li>Publication Date: {book.publicationDate ? new Date(book.publicationDate).toLocaleDateString('en-IN') : '—'}</li>
              <li className="mt-2">Stock: <strong>{book.stock > 0 ? `${book.stock} available` : 'Out of stock'}</strong></li>
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="font-medium">Frequently Asked</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div><strong>Delivery:</strong> Estimated 3-7 business days across major cities in India.</div>
              <div><strong>Return Policy:</strong> 7-day returns on eligible items.</div>
              <div><strong>Invoice:</strong> Digital invoice will be sent after purchase.</div>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="font-medium">Reviews</h3>
            <div className="mt-4 space-y-4">
              {book.reviews.length === 0 && <div className="text-sm text-slate-500">No reviews yet. Be the first to review.</div>}
              {book.reviews.map((r:any)=> (
                <div key={r.id} className="border rounded p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.title || 'Review'}</div>
                    <div className="text-sm text-slate-500">{r.rating} ★</div>
                  </div>
                  <div className="text-sm text-slate-600 mt-2">{r.body}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <ReviewForm bookId={book.id} />
            </div>
          </section>

          <section className="mt-8">
            <FrequentlyBoughtTogether bookId={book.id} />
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <div className="text-2xl font-semibold">₹{book.price.toFixed(2)}</div>
            {book.mrp && <div className="text-sm text-slate-500 line-through">₹{book.mrp.toFixed(2)}</div>}
            <div className="mt-4 text-sm text-slate-600">{book.rating?.toFixed(1) || '—'} ★ • {book.totalReviews} reviews</div>
            <div className="mt-4 text-sm text-slate-600">{book.stock > 0 ? 'In stock' : 'Out of stock'}</div>

            <div className="mt-6">
              <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md" onClick={() => { /* prefer StickyBuyBar for action */ }}>Buy now</button>
            </div>

            <div className="mt-4 text-xs text-slate-500">Delivery estimate: 3-7 business days</div>
            <div className="mt-2 text-xs text-slate-500">Return policy: 7-day returns on eligible books</div>
          </div>

          <div className="mt-6">
            <SimilarBooks books={similar.filter(s=> s.id !== book.id)} />
          </div>
        </aside>
      </div>

      <StickyBuyBar bookId={book.id} price={book.price} title={book.title} slug={book.slug} available={book.stock>0} />
    </div>
  )
}
