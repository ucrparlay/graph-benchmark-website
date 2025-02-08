import graphs from '@/graphs'
import GraphTable from '@/components/GraphTable'
import getCategories from '@/utils/getCategories'

export async function generateStaticParams() {
  const categories = getCategories(graphs)

  return Object.keys(categories).map((category) => ({
    category: encodeURIComponent(category.trim()),
  }))
}

export default async function Category({ params }) {
  const category = decodeURIComponent((await params)['category'])
  return (
    <>
      <div className='text-3xl mb-4'>
        Graphs belonging to <strong>{category}</strong> category
      </div>
      <GraphTable
        graphs={Object.values(graphs).filter((graph) =>
          graph?.categories?.find((cat) => cat === category)
        )}
      />
    </>
  )
}
