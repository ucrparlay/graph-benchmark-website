export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ucrparlay.github.io/graph-benchmark-website/sitemap.xml',
  }
}