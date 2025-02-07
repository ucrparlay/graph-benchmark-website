import graphs from '@/graphs'

export default function Graphs() {
  return (
    <div className='w-full max-w-full overflow-x-auto'>
      <table className='table-auto'>
        <thead>
          <tr>
            <th>Graph Name</th>
            <th>Categories</th>
            <th>Generation Type</th>
            <th>Directed</th>
            <th>Weighted</th>
            <th>Vertices</th>
            <th>Edges</th>
            <th>Density</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(graphs).map((graph) => (
            <tr key={graph?.path}>
              <td>{graph?.title}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
