
/* eslint-disable no-plusplus, no-new-object, no-cond-assign */

// https://codeforces.com/problemset/problem/980/E

const disjointSet = require('disjoint-set');

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

  // for (let index = 1; index <= districtNum; index++) {
  //   graph.add(new Object(index));
  // }
  edges.forEach((edge) => {
    graph.add(edge.a); graph.add(edge.b);
    graph.add(edge.a); graph.add(edge.b);
    graph.union(edge.a, edge.b);
  });
  return graph;
};

const getRemovedContestants = (districtNum, contestantNumToRemove, paths) => {
  const vertexNum = districtNum - contestantNumToRemove;
  const edgesNum = vertexNum - 1;
  const edges = [];
  paths.forEach((path) => {
    const edge = { a: new Object(path.a), b: new Object(path.b) };
    edges.push(edge);
  });
  let combinatorEdges;
  const combinatorEdgesT = permute(edges, 0, edgesNum);
  console.log(perEdges);
  const resu = [];
  for (const combinatorEdges in perEdges) {
    const graph = buildGraph(combinatorEdges);
    if (graph.extract().length) {
      if (isConnected(graph)) {
        console.log(combinatorEdges);

        resu.push({ fans: getTotalFans(graph), graph: getGraphVertices(graph) });
      }
    }
    // build graph
    // isConnected()
    // getTotalFans()
    // find the maximum
  }
  console.log(resu);
  return 1;
};

module.exports = {
  getGraphVertices,
  isConnected,
  getTotalFans,
  buildGraph,
  getRemovedContestants,
};
