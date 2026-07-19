export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-semibold mb-4">PUSTAKATTICK</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">Books that Build Better Minds. Discover curated collections, best-sellers, and new releases.</p>
          <div className="flex gap-3">
            <a className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-md" href="/shop">Shop Books</a>
            <a className="inline-flex items-center px-5 py-3 border rounded-md" href="/about">About Us</a>
          </div>
        </div>
        <div className="rounded-md overflow-hidden bg-gradient-to-tr from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 p-6">
          <h3 className="text-lg font-medium mb-4">Featured</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Trending Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Book cards will render here */}
        </div>
      </section>
    </div>
  )
}
