export default function Footer(){
  return (
    <footer className="border-t mt-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold">PUSTAKATTICK</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Books that Build Better Minds.</p>
        </div>
        <div>
          <h5 className="font-medium">Shop</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li><a href="/categories">Categories</a></li>
            <li><a href="/collections">Collections</a></li>
            <li><a href="/offers">Offers</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium">Company</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium">Support</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping-policy">Shipping</a></li>
            <li><a href="/returns">Returns</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} PUSTAKATTICK. All rights reserved.</div>
    </footer>
  )
}
