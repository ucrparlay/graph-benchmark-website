import graphs from '@/graphs'
import Link from 'next/link'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

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

  const graphStatistics = [
    { label: "Vertices", value: graph?.vertices_count },
    { label: "Edges", value: graph?.edges_count },
    { label: "Density", value: graph?.density?.toFixed(6) },
    { label: "Average Degree", value: graph?.avg_degree?.toFixed(6) },
    ...(!graph?.symmetric ? [
      { label: "Min. out-degree", value: graph?.min_out_degree },
      { label: "Max. out-degree", value: graph?.max_out_degree },
      { label: "No. of 0 out-degree vertices", value: graph?.zero_out_degree_count },
      { label: "Min. in-degree", value: graph?.min_in_degree },
      { label: "Max. in-degree", value: graph?.max_in_degree },
      { label: "No. of 0 in-degree vertices", value: graph?.zero_in_degree_count },
      { label: "No. of Connected Components", value: graph?.scc_count },
      { label: "Size of the largest Connected Component", value: graph?.largest_scc_size },
      { label: "Percentage of the largest Connected Component", value: `${(graph?.largest_scc_size * 100 / graph?.vertices_count).toFixed(6)}%` },
    ] : [
      { label: "Min. Degree", value: graph?.min_out_degree },
      { label: "Max. Degree", value: graph?.max_out_degree },
      { label: "No. of 0 degree vertices", value: graph?.zero_out_degree_count },
      { label: "No. of Biconnected Components", value: graph?.bcc_count },
      { label: "Size of the largest Biconnected Component", value: graph?.largest_bcc_size },
      { label: "Percentage of the largest Biconnected Component", value: `${(graph?.largest_bcc_size * 100 / graph?.vertices_count).toFixed(6)}%` },
      { label: "No. of Strongly Connected Components", value: graph?.scc_count },
      { label: "Size of the largest Strongly Connected Component", value: graph?.largest_scc_size },
      { label: "Percentage of the largest Strongly Connected Component", value: `${(graph?.largest_scc_size * 100 / graph?.vertices_count).toFixed(6)}%` },
    ])
  ]

  return (
    <>
      <div className='flex flex-col lg:flex-row lg:items-center gap-4 mb-2'>
        <div className='text-3xl flex-1'>{graph?.title}</div>
        {[graph?.path, graph?.path2].filter(path => path).map(path => (
          <Link
            key={path}
            href={`https://pasgal-bs.cs.ucr.edu/${path}`}
            role='button'
            className='text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 rounded-lg px-5 py-2.5'>
            {`Download ${path.substr(-4)} Graph File`}
          </Link>
        ))}
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
                  <div className='flex items-center'>
                    Graph Statistics
                    <div className='tooltip-container ml-2'>
                      <Link
                        href="/graph-statistics-info">
                        <InformationCircleIcon className='size-5' />
                      </Link>
                      <div
                        className="tooltip z-50 rounded-lg bg-black py-1.5 px-3 text-sm font-normal text-white">
                        Click to know how the statisctics are computed
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {graphStatistics?.map(({label, value}) => (
                <tr className='border-b' key={label}>
                  <th className={cellClassName}>{label}</th>
                  <td className={cellClassName}>{value}</td>
                </tr>
              ))}
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
