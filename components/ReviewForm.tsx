'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const schema = z.object({
  title: z.string().optional(),
  rating: z.number().min(1).max(5),
  body: z.string().min(5)
})

type FormData = z.infer<typeof schema>

export default function ReviewForm({ bookId }: { bookId: string }){
  const { register, handleSubmit, reset } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { rating: 5 } })
  const [submitting, setSubmitting] = useState(false)
  const [ok, setOk] = useState<string | null>(null)

  async function onSubmit(data: FormData){
    setSubmitting(true)
    try{
      const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookId, ...data }) })
      const j = await res.json()
      if (j.data) {
        setOk('Review submitted')
        reset()
      } else {
        setOk('Unable to submit review')
      }
    } catch (err){
      setOk('Network error')
    } finally { setSubmitting(false) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm">Rating</label>
        <input type="number" min={1} max={5} {...register('rating', { valueAsNumber: true })} className="w-24 border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm">Title (optional)</label>
        <input {...register('title')} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm">Your review</label>
        <textarea {...register('body')} className="w-full border rounded px-3 py-2 h-28" />
      </div>
      <div>
        <button type="submit" disabled={submitting} className="px-4 py-2 bg-indigo-600 text-white rounded">{submitting? 'Submitting...':'Submit review'}</button>
        {ok && <div className="mt-2 text-sm text-slate-600">{ok}</div>}
      </div>
    </form>
  )
}
