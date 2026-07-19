export function generateOpenGraph(product: { title: string; description: string; slug: string }){
  return {
    title: product.title,
    description: product.description,
    url: `${process.env.SITE_URL}/book/${product.slug}`
  }
}
