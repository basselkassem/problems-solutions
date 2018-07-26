
/* eslint-disable no-plusplus, no-cond-assign */

// https://codeforces.com/problemset/problem/1009/E
const combinator = require('js-combinatorics');

const computeRestSitesIndexs = (distribution) => {
  const res = [];
  let factor = 1;
  res.push(factor);
  distribution.forEach((element) => {
    if (element === 1) {
      factor = 1;
    } else {
      factor++;
    }
    res.push(factor);
  });
  return res;
};
const computeDistributionDifficulty = (difficultyArray, distribution) => {
  let res = 0;
  const restSitesIndexs = computeRestSitesIndexs(distribution);
  restSitesIndexs.forEach((element) => {
    res += difficultyArray[element - 1];
  });
  return res;
};
const computeDifficulty = (distance, difficultyArray) => {
  let res = 0;
  const distributions = combinator.baseN([0, 1], distance - 1).toArray();
  distributions.forEach((distribution) => {
    res += computeDistributionDifficulty(difficultyArray, distribution);
  });
  return res % 998244353;
};

module.exports = {
  computeRestSitesIndexs,
  computeDistributionDifficulty,
  computeDifficulty,
};
