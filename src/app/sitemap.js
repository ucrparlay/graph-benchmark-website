export const dynamic = 'force-static'

export default function sitemap() {
  return [
    {
      url: 'https://ucrparlay.github.io/graph-benchmark-website/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://ucrparlay.github.io/graph-benchmark-website/categories',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://ucrparlay.github.io/graph-benchmark-website/graphs',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://ucrparlay.github.io/graph-benchmark-website/about-us',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}