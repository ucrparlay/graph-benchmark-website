import graphs from '@/graphs'
import Link from 'next/link'

export async function generateStaticParams() {
  return Object.keys(graphs).map((graph) => ({
    graph: graph
      .split('/')
      .map((graph_file_part) => encodeURIComponent(graph_file_part.trim())),
  }))
}

export default async function Graph({ params }) {
  const graph_name = (await params)?.['graph']
    .map((graph_file_part) => decodeURIComponent(graph_file_part))
    .join('/')

  const graph = graphs?.[graph_name]

  const cellClassName = 'p-3 text-left'

  return (
    <>
      <div className='flex items-center justify-between mb-2'>
        <div className='text-3xl'>{graph?.title}</div>
        {graph?.path && (
          <Link
            href={`https://pasgal-bs.cs.ucr.edu/${graph?.path}`}
            role='button'
            className='text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 rounded-lg px-5 py-2.5'>
            Download Graph Data
          </Link>
        )}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2 mt-8'>
        <div className='w-full max-w-full overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead>
              <tr className='bg-blue-200'>
                <th colSpan='2' className={cellClassName}>
                  Metadata
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <th className={cellClassName}>Name</th>
                <td className={cellClassName}>{graph?.title}</td>
              </tr>
              {graph?.categories && (
                <tr className='border-b'>
                  <th className={cellClassName}>Categories</th>
                  <td className={`${cellClassName} flex flex-col`}>
                    {graph?.categories?.map((category) => (
                      <Link
                        key={`${graph?.path} - ${category}`}
                        href={`/category/${category}`}
                        className='text-blue-500 underline'>
                        {category}
                      </Link>
                    ))}
                  </td>
                </tr>
              )}

              {graph?.generation_type && (
                <tr className='border-b'>
                  <th className={cellClassName}>Generation Type</th>
                  <td className={cellClassName}>{graph?.generation_type}</td>
                </tr>
              )}
              <tr className='border-b'>
                <th className={cellClassName}>Symmetric</th>
                <td className={cellClassName}>
                  {graph?.symmetric ? 'Yes' : 'No'}
                </td>
              </tr>
              <tr className='border-b'>
                <th className={cellClassName}>Weighted</th>
                <td className={cellClassName}>
                  {graph?.weighted ? 'Yes' : 'No'}
                </td>
              </tr>
              {graph?.about && (
                <tr className='border-b'>
                  <th className={cellClassName}>About</th>
                  <td className={cellClassName}>{graph?.about}</td>
                </tr>
              )}
              {graph?.source && (
                <tr className='border-b'>
                  <th className={cellClassName}>Source</th>
                  <td className={cellClassName}>
                    <a href={graph.source}>{graph.source}</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className='w-full max-w-full overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead>
              <tr className='bg-blue-200'>
                <th colSpan='2' className={cellClassName}>
                  Graph Statistics
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <th className={cellClassName}>Vertices</th>
                <td className={cellClassName}>{graph?.vertices_count}</td>
              </tr>
              <tr className='border-b'>
                <th className={cellClassName}>Edges</th>
                <td className={cellClassName}>{graph?.edges_count}</td>
              </tr>
              <tr className='border-b'>
                <th className={cellClassName}>Density</th>
                <td className={cellClassName}>{graph?.density?.toFixed(6)}</td>
              </tr>
              <tr className='border-b'>
                <th className={cellClassName}>Average Degree</th>
                <td className={cellClassName}>
                  {graph?.avg_degree?.toFixed(6)}
                </td>
              </tr>
              <tr className='border-b'>
                <th className={cellClassName}>Min. Degree</th>
                <td className={cellClassName}>{graph?.min_degree}</td>
              </tr>
              <tr className='border-b'>
                <th className={cellClassName}>Max. Degree</th>
                <td className={cellClassName}>{graph?.max_degree}</td>
              </tr>
              <tr className='border-b'>
                <th className={cellClassName}>
                  No. of Strongly Connected Components
                </th>
                <td className={cellClassName}>{graph?.scc_count}</td>
              </tr>
              <tr className='border-b'>
                <th className={cellClassName}>
                  Size of the largest Strongly Connected Component
                </th>
                <td className={cellClassName}>{graph?.largest_scc_size}</td>
              </tr>
              {graph?.symmetric && (
                <>
                  <tr className='border-b'>
                    <th className={cellClassName}>
                      No. of Biconnected Components
                    </th>
                    <td className={cellClassName}>{graph?.bcc_count}</td>
                  </tr>
                  <tr className='border-b'>
                    <th className={cellClassName}>
                      Size of the largest Biconnected Component
                    </th>
                    <td className={cellClassName}>{graph?.largest_bcc_size}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {graph?.description && (
        <div className='w-full max-w-full overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead>
              <tr className='bg-blue-200'>
                <th className={cellClassName}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <td className={cellClassName}>{graph?.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
