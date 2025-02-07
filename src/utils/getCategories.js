import graphs from '@/graphs'

export default function getCategories() {
  const categories = {}
  Object.entries(graphs).forEach(([graphName, graph]) => {
    graph?.categories?.forEach((category) => {
      if (!(category in categories)) {
        categories[category] = []
      }
      categories[category].push(graphName)
    })
  })
  return categories
}
