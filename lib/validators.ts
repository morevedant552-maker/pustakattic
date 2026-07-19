import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
})

export const bookQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  page: z.preprocess((v) => Number(v), z.number().min(1)).optional()
})
