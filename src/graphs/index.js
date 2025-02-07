import binGraphs from './bin.json'
import knnGraphs from './knn.json'
import linksGraphs from './links.json'
import pbbsGraphs from './pbbs.json'
import syntheticGraphs from './synthetic.json'

const graphs = {
  ...binGraphs,
  ...knnGraphs,
  ...linksGraphs,
  ...pbbsGraphs,
  ...syntheticGraphs,
}

export default graphs
