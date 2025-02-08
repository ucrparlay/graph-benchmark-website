import graphs from '@/graphs'
import GraphTable from '@/components/GraphTable'

export default function Graphs() {
  return <GraphTable graphs={Object.values(graphs)} />
}
