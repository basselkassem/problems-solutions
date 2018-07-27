const { findMinimumTrains } = require('./mini-metro');

const stationNum = 3; const hoursNum = 3; const trainCapacity = 10;
const ai = [2, 3, 4];
const bi = [4, 3, 2];
const ci = [10, 9, 8];
findMinimumTrains(stationNum, hoursNum, trainCapacity, ai, bi, ci);
