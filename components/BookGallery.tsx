'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function BookGallery({ images }: { images: string[] }){
  const [index, setIndex] = useState(0)

  return (
    <div>
      <div className="w-full h-[480px] bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex items-center justify-center">
        <motion.div key={images[index]} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full relative">
          {/* Using next/image would optimize; falling back to simple img for demo */}
          <img src={images[index]} alt="book image" className="w-full h-full object-contain" />
        </motion.div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto">
        {images.map((src, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-24 h-32 rounded overflow-hidden flex-shrink-0 border ${i===index? 'ring-2 ring-blue-500': 'border-transparent'}`}>
            <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
