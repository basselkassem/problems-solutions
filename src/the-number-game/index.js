
/* eslint-disable no-plusplus, no-new-object, no-cond-assign */

// https://codeforces.com/problemset/problem/980/E

const disjointSet = require('disjoint-set');
const combinator = require('js-combinatorics');

const generateCombination = (array, length) => {
  const resArray = [];
  let comb;
  const generator = combinator.combination(array, length);
  while (comb = generator.next()) {
    resArray.push(comb);
  }
  return resArray;
};
const getGraphVertices = graph => graph.extract()
  .reduce((acc, vertex) => acc.concat(vertex));

const isConnected = (graph) => {
  const districts = getGraphVertices(graph);
  for (let district = 0; district < districts.length; district++) {
    for (let neaborDistrict = district + 1; neaborDistrict < districts.length; neaborDistrict++) {
      if (!graph.connected(districts[district], districts[neaborDistrict])) {
        return false;
      }
    }
  }
  return true;
};

const getTotalFans = (graph) => {
  let total = 0;
  const districts = getGraphVertices(graph);
  districts.forEach((district) => {
    total += 2 ** district;
  });
  return total;
};

const buildGraph = (edges) => {
  const graph = disjointSet();
  edges.forEach((edge) => {
    graph.add(edge.a); graph.add(edge.b);
    graph.add(edge.a); graph.add(edge.b);
    graph.union(edge.a, edge.b);
  });
  return graph;
};
const pathEdgeMapper = paths2d => paths2d
  .map(paths => paths.map(path => ({ a: new Object(path.a), b: new Object(path.b) })));

const getRemovedContestants = (districtNum, contestantNumToRemove, paths) => {
  const vertexNum = districtNum - contestantNumToRemove;
  const edgesNum = vertexNum - 1;
  const possiblePaths = generateCombination(paths, edgesNum);
  const possibleEdges = pathEdgeMapper(possiblePaths);
  const possibleGraphs = [];
  possibleEdges.forEach((edges) => {
    const graph = buildGraph(edges);
    if (isConnected(graph, edges)) {
      console.log('====>>', edges);
      possibleGraphs.push({ fans: getTotalFans(graph), graph: getGraphVertices(graph) });
    } else {
      console.log('-->>', edges);
    }
    graph.destroy();
  });
  console.log(possibleGraphs);
  return 1;
};

module.exports = {
  generateCombination,
  getGraphVertices,
  isConnected,
  getTotalFans,
  buildGraph,
  pathEdgeMapper,
  getRemovedContestants,
};
