
// https://codeforces.com/problemset/problem/980/E
const getPossibleWays = (busCapacity, busStopsRecords) => {
  const recordsSum = busStopsRecords.reduce((acc, item) => {
    if (item > 0) {
      return acc + item;
    }
    return acc;
  });
  return busCapacity - recordsSum + 1;
};

module.exports = getPossibleWays;
