
/* eslint-disable no-plusplus, no-cond-assign */

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

const getVertices = paths2d => paths2d.reduce((paths, pathsArr) => pathsArr.concat(paths))
  .filter((path, pos, filteredPaths) => filteredPaths.indexOf(path) === pos);

const isConnected = (tree, paths2d) => {
  const vertices = getVertices(paths2d);
  for (let vertex = 0; vertex < vertices.length; vertex++) {
    for (let neaborVertex = vertex + 1; neaborVertex < vertices.length; neaborVertex++) {
      if (tree.find(vertices[vertex]) !== tree.find(vertices[neaborVertex])) {
        return false;
      }
    }
  }
  return true;
};

const getTotalFans = (districts) => {
  let total = 0;
  districts.forEach((district) => {
    total += 2 ** district;
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

const getRemovedContestants = (districtNum, contestantNumToRemove, paths) => {
  const vertexNum = districtNum - contestantNumToRemove;
  const edgesNum = vertexNum - 1;
  const possiblePaths = generateCombination(paths, edgesNum);
  const possibleTrees = [];

  possiblePaths.forEach((edges) => {
    const vertices = getVertices(edges);
    const tree = buildTree(Math.max(...vertices), edges);
    if (isConnected(tree, edges)) {
      possibleTrees.push({ fans: getTotalFans(vertices), districts: vertices });
    }
  });
  const desiredTree = possibleTrees.reduce((prev, curr) => (prev.fans > curr.fans ? prev : curr));
  let excludedDistrict = [];
  for (let district = 1; district <= districtNum; district++) {
    if (!desiredTree.districts.includes(district)) {
      excludedDistrict.push(district);
    }
  }
  if (edgesNum === 0) {
    excludedDistrict = [];
    for (let district = 1; district < districtNum; district++) {
      excludedDistrict.push(district);
    }
  }
  return excludedDistrict;
};

module.exports = {
  generateCombination,
  getVertices,
  isConnected,
  getTotalFans,
  buildTree,
  getRemovedContestants,
};
