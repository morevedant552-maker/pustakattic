import create from 'zustand'

type CartItem = { bookId: string; quantity: number }

type CartState = {
  items: CartItem[]
  add: (bookId: string, qty?: number)=>void
  remove: (bookId: string)=>void
  clear: ()=>void
}

export const useCart = create<CartState>((set)=>({
  items: [],
  add: (bookId, qty=1)=> set((s)=>{
    const idx = s.items.findIndex(i=>i.bookId===bookId)
    if(idx>-1){
      const items = [...s.items]
      items[idx].quantity += qty
      return { items }
    }
    return { items: [...s.items, {bookId, quantity: qty}] }
  }),
  remove: (bookId)=> set((s)=>({ items: s.items.filter(i=>i.bookId!==bookId) })),
  clear: ()=> set({ items: [] })
}))
