import Link from "next/link";

export default function GraphStatisticsInfo() {
  return (
    <>
      <h1 className="text-3xl my-2">
        Graph Statistics Info
      </h1>

      <p>
        Graph statistics provide crucial insights into the structure and properties of a graph.
        These metrics help to analyze graph characteristics, compare datasets, and optimize algorithms.
        The following statistics are computed using parallel algorithms from the PASGAL repository 
        (<Link className='text-blue-500 underline' href="https://github.com/ucrparlay/PASGAL">PASGAL GitHub</Link>).
      </p>
  
      <ol className="mt-2">
        <li className="text-xl mt-1">
          Number of Nodes (<code>n</code>)
        </li>
        <p>The total number of vertices present in the graph.</p>

        <li className="text-xl mt-1">
          Number of Edges (<code>m</code>)
        </li>
        <ul>
          <li>
            It is the total number of edges present in the graph.
          </li>
          <li>
            The maximum possible edges in a graph is given by <code>n(n-1)</code> for both symmetric and asymmetric graphs.
          </li>
          <li>
            In symmetric graphs, all edges are counted twice (in both directions), ensuring that m is always even.
          </li>
        </ul>

        <li className="text-xl mt-1">
          Density
        </li>
        <p>The density of a graph is given by <code>m/n(n-1)</code>.</p>

        <li className="text-xl mt-1">
          Average Degree
        </li>
        <p>The average degree of a graph is given by <code>m/n</code>.</p>

        <li className="text-xl mt-1">
          Min. Out-degree & Min. In-degree
        </li>
        <p>The smallest number of outgoing and incoming edges respectively. In symmetric graphs, these values are always equal and shown as <code>Min. Degree</code>.</p>

        <li className="text-xl mt-1">
          Max. Out-degree & Max. In-degree
        </li>
        <p>The largest number of outgoing and incoming edges respectively. In symmetric graphs, these values are always equal and shown as <code>Max. Degree</code>.</p>

        <li className="text-xl mt-1">
          Number of 0 Out-degree & 0 In-degree Vertices
        </li>
        <p>The count of vertices that have no outgoing and incoming edges respectively. In symmetric graphs, these values are always equal and represented as <code>No. of 0 Degree Vertices</code>.</p>

        <li className="text-xl mt-1">
          Number of Biconnected Components (<code>BCC</code>)
        </li>
        <ul>
          <li>
            A biconnected component is a maximal subgraph where removing any single vertex does not disconnect the subgraph.
          </li>
          <li>
            Only for Symmetric Graphs
          </li>
        </ul>

        <li className="text-xl mt-1">
          Size of the Largest Biconnected Component (<code>l_bcc_size</code>)
        </li>
        <ul>
          <li>
          The number of nodes in the largest biconnected component.
          </li>
          <li>
            Only for Symmetric Graphs
          </li>
        </ul>

        <li className="text-xl mt-1">
          Percentage of the Largest Biconnected Component
        </li>
        <ul>
          <li>
            The percentage of the largest biconnected component of a graph is given by <code>l_bcc_size/n</code>.
          </li>
          <li>
            Only for Symmetric Graphs
          </li>
        </ul>

        <li className="text-xl mt-1">
          Number of Strongly Connected Components (<code>SCC</code>)
        </li>
        <ul>
          <li>
            A strongly connected component is a maximal subgraph where every node is reachable from every other node.
          </li>
          <li>
            In symmetric graphs, this is referred to as <code>Number of Connected Components</code>.
          </li>
        </ul>

        <li className="text-xl mt-1">
          Size of the Largest Strongly Connected Component (<code>l_scc_size</code>)
        </li>
        <ul>
          <li>
            The number of vertices in the largest strongly connected component.
          </li>
          <li>
            In symmetric graphs, this is referred to as <code>Size of the Largest Connected Component</code>.
          </li>
        </ul>

        <li className="text-xl mt-1">
          Percentage of the Largest Strongly Connected Component
        </li>
        <ul>
          <li>
            The percentage of the largest strongly connected component of a graph is given by <code>l_scc_size/n</code>.
          </li>
          <li>
            In symmetric graphs, this is referred to as Size of the <code>Percentage of the Largest Connected Component</code>.
          </li>
        </ul>
      </ol>
    </>
  )
}
