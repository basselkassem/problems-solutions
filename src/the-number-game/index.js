
/* eslint-disable no-plusplus, no-new-object, no-cond-assign */

// https://codeforces.com/problemset/problem/980/E

const UnionFind = require('union-find');
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
const getGraphVertices = graph => graph;

const isConnected = (tree, verticesNum) => {
  const labels = new Array(verticesNum);
  for (let i = 0; i < verticesNum; ++i) {
    labels[i] = tree.find(i);
  }
  const newLabel = labels.filter((item, pos, arr) => arr.indexOf(item) === pos);
  if (newLabel.length === 1) {
    return true;
  }
  return false;
};

const getTotalFans = (districts) => {
  let total = 0;
  districts.forEach((district) => {
    total += 2 ** (district + 1);
  });
  return total;
};

const buildTree = (verticesNum, edges) => {
  const tree = new UnionFind(verticesNum);
  for (let i = 0; i < edges.length; ++i) {
    tree.link(edges[i][0], edges[i][1]);
  }
  return tree;
};
const mapPaths = paths => paths.map(path => [path[0] - 1, path[1] - 1]);

const getRemovedContestants = (districtNum, contestantNumToRemove, paths) => {
  const vertexNum = districtNum - contestantNumToRemove;
  const edgesNum = vertexNum - 1;
  const mappedPaths = mapPaths(paths);
  const possiblePaths = generateCombination(mappedPaths, edgesNum);
  const possibleGraphs = [];
  possiblePaths.forEach((edges) => {
    const graph = buildTree(edges);
    if (isConnected(graph)) {
      possibleGraphs.push({ fans: getTotalFans(graph), graph: getGraphVertices(graph) });
    } else {
      console.log('-->>', edges);
    }
  });
  console.log(possibleGraphs);
  return 1;
};

module.exports = {
  generateCombination,
  getGraphVertices,
  isConnected,
  getTotalFans,
  buildTree,
  getRemovedContestants,
};
