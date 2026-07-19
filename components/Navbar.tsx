'use client'
import Link from 'next/link'

export default function Navbar(){
  return (
    <nav className="w-full border-b bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl">PUSTAKATTICK</Link>
        <div className="flex items-center gap-4">
          <Link href="/shop">Shop</Link>
          <Link href="/authors">Authors</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/cart" className="px-3 py-2 bg-blue-600 text-white rounded">Cart</Link>
        </div>
      </div>
    </nav>
  )
}
