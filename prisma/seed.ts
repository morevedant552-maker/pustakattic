#!/usr/bin/env ts-node
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const author = await prisma.author.upsert({
    where: { slug: 'jane-doe' },
    update: {},
    create: { name: 'Jane Doe', slug: 'jane-doe', bio: 'Award-winning author' }
  })

  const publisher = await prisma.publisher.upsert({
    where: { slug: 'tech-press' },
    update: {},
    create: { name: 'Tech Press', slug: 'tech-press' }
  })

  const category = await prisma.category.upsert({
    where: { slug: 'technology' },
    update: {},
    create: { name: 'Technology', slug: 'technology' }
  })

  const book = await prisma.book.upsert({
    where: { slug: 'building-modern-apps' },
    update: {},
    create: {
      title: 'Building Modern Apps',
      slug: 'building-modern-apps',
      description: 'A practical guide to building modern web applications.',
      isbn: '978-1-23456-789-7',
      sku: 'BK-001',
      language: 'English',
      pages: 420,
      edition: '1st',
      publicationDate: new Date('2024-01-01'),
      price: 29.99,
      mrp: 39.99,
      stock: 150,
      coverImage: '',
      gallery: [],
      rating: 4.6,
      totalReviews: 12,
      authorId: author.id,
      publisherId: publisher.id,
      categories: { connect: { id: category.id } }
    }
  })

  await prisma.user.upsert({
    where: { email: 'demo@pustakattick.com' },
    update: {},
    create: {
      email: 'demo@pustakattick.com',
      name: 'Demo User',
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
