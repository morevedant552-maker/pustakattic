import { prisma } from '../../lib/prisma'
import BookCard from '../../components/BookCard'
import Pagination from '../../components/Pagination'

export default async function ShopPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }){
  const page = searchParams?.page ? Number(searchParams.page) : 1
  const take = 12
  const skip = (page - 1) * take

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      skip,
      take,
      include: { author: true }
    }),
    prisma.book.count()
  ])

  const pages = Math.max(1, Math.ceil(total / take))

  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Shop Books</h1>
        <p className="text-slate-600 mt-2">Browse our collection of curated books across categories.</p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((b) => (
          <BookCard key={b.id} title={b.title} author={b.author?.name || 'Unknown'} price={b.price} slug={b.slug} cover={b.coverImage || '/placeholder-book.jpg'} />
        ))}
      </section>

      <div className="mt-8">
        <Pagination current={page} total={pages} basePath="/shop" />
      </div>
    </div>
  )
}
