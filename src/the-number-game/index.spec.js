/* eslint-disable no-cond-assign */

const { expect } = require('chai');
const {
  generateCombination, isConnected, getRemovedContestants, buildTree, getTotalFans,
} = require('./index');

describe('the number game solution', () => {
  describe('isConnected', () => {
    it('should return true when paths = [[0, 1], [1, 2], [2, 3], [1, 7]]', () => {
      const verticesNum = 5;
      const paths = [[0, 1], [1, 2], [2, 3], [1, 4]];
      const tree = buildTree(verticesNum, paths);
      const expectIsConnected = isConnected(tree, paths);
      expect(expectIsConnected).to.equal(true);
    });
    it('should return true when paths = [[0, 1], [2, 0]];', () => {
      const verticesNum = 3;
      const paths = [[0, 1], [2, 0]];
      const tree = buildTree(verticesNum, paths);
      const expectIsConnected = isConnected(tree, paths);
      expect(expectIsConnected).to.equal(true);
    });
    it('should return true when paths = [[2, 6], [6, 5]];', () => {
      const verticesNum = 7;
      const paths = [[2, 6], [6, 5]];
      const tree = buildTree(verticesNum, paths);
      const expectIsConnected = isConnected(tree, paths);
      expect(expectIsConnected).to.equal(true);
    });
    it('should return false when paths = [[0, 1], [2, 3]]', () => {
      const verticesNum = 4;
      const paths = [[0, 1], [2, 3]];
      const tree = buildTree(verticesNum, paths);
      const expectIsConnected = isConnected(tree, paths);
      expect(expectIsConnected).to.equal(false);
    });
    it('should return false when paths = [[2, 6], [7, 5]];', () => {
      const verticesNum = 8;
      const paths = [[2, 6], [7, 5]];
      const tree = buildTree(verticesNum, paths);
      const expectIsConnected = isConnected(tree, paths);
      expect(expectIsConnected).to.equal(false);
    });
  });
  describe('getTotalFans', () => {
    describe('when paths = [2 5, 5 6]', () => {
      const vertices = [2, 5, 6];
      const expectTotalFans = getTotalFans(vertices);
      it('should return 100', () => {
        expect(expectTotalFans).to.equal(100);
      });
    });
    describe('when paths = [1 3, 1 4]', () => {
      const vertices = [1, 4, 3];
      const expectTotalFans = getTotalFans(vertices);
      it('should return 26', () => {
        expect(expectTotalFans).to.equal(26);
      });
    });
  });
  describe('generateCombination', () => {
    describe('when array = [[2, 1],[2, 6],[4, 2],[5, 6],[2, 3]],length = 2', () => {
      it('should return 10 correct combinations', () => {
        const array = [[2, 1], [2, 6], [4, 2], [5, 6], [2, 3]];
        const res = generateCombination(array, 2);
        const expectRes = [
          [[2, 1], [2, 6]],
          [[2, 1], [4, 2]],
          [[2, 6], [4, 2]],
          [[2, 1], [5, 6]],
          [[2, 6], [5, 6]],
          [[4, 2], [5, 6]],
          [[2, 1], [2, 3]],
          [[2, 6], [2, 3]],
          [[4, 2], [2, 3]],
          [[5, 6], [2, 3]],
        ];
        expect(res.length).to.equal(10);
        expect(res).to.deep.equal(expectRes);
      });
      it('should return 10 wrong combinations', () => {
        const array = [[2, 1], [2, 6], [4, 2], [5, 6], [2, 3]];
        const res = generateCombination(array, 2);
        const expectRes = [
          [[2, 1], [2, 6]],
          [[2, 1], [4, 2]],
          [[2, 6], [4, 2]],
          [[2, 1], [5, 6]],
          [[2, 6], [5, 6]],
          [[4, 2], [5, 6]],
          [[2, 1], [2, 3]],
          [[2, 6], [2, 3]],
          [[4, 2], [2, 3]],
          [[5, 6], [2, 7]],
        ];
        expect(res.length).to.equal(10);
        expect(res).to.not.deep.equal(expectRes);
      });
    });
  });
  describe('getRemovedContestants', () => {
    describe('when paths = [[2, 1], [2, 6], [4, 2], [5, 6], [2, 3]]', () => {
      describe('when districtNum = 6 & contestantNumToRemove = 3', () => {
        it('should returns [1 3 4]', () => {
          const districtNum = 6; const contestantNumToRemove = 3;
          const paths = [[2, 1], [2, 6], [4, 2], [5, 6], [2, 3]];
          const expectedRes = [1, 3, 4];
          const res = getRemovedContestants(districtNum, contestantNumToRemove, paths);
          expect(res).to.deep.equal(expectedRes);
        });
      });
      describe('when districtNum = 6 & contestantNumToRemove = 4', () => {
        it('should returns [1 2 3 4]', () => {
          const districtNum = 6; const contestantNumToRemove = 4;
          const paths = [[2, 1], [2, 6], [4, 2], [5, 6], [2, 3]];
          const expectedRes = [1, 2, 3, 4];
          const res = getRemovedContestants(districtNum, contestantNumToRemove, paths);
          expect(res).to.deep.equal(expectedRes);
        });
      });
      describe('when districtNum = 6 & contestantNumToRemove = 5', () => {
        it('should returns [1 2 3 4 5]', () => {
          const districtNum = 6; const contestantNumToRemove = 5;
          const paths = [[2, 1], [2, 6], [4, 2], [5, 6], [2, 3]];
          const expectedRes = [1, 2, 3, 4, 5];
          const res = getRemovedContestants(districtNum, contestantNumToRemove, paths);
          expect(res).to.deep.equal(expectedRes);
        });
      });
      describe('when districtNum = 6 & contestantNumToRemove = 1', () => {
        it('should returns [1]', () => {
          const districtNum = 6; const contestantNumToRemove = 1;
          const paths = [[2, 1], [2, 6], [4, 2], [5, 6], [2, 3]];
          const expectedRes = [1];
          const res = getRemovedContestants(districtNum, contestantNumToRemove, paths);
          expect(res).to.deep.equal(expectedRes);
        });
      });
    });
    describe('when paths = [[2, 6], [2, 7], [7, 8], [1, 2], [3, 1], [2, 4], [7, 5]]', () => {
      describe('when districtNum = 8 & contestantNumToRemove = 4', () => {
        it('should returns [1 3 4 5]', () => {
          const districtNum = 8; const contestantNumToRemove = 4;
          const paths = [[2, 6], [2, 7], [7, 8], [1, 2], [3, 1], [2, 4], [7, 5]];
          const expectedRes = [1, 3, 4, 5];
          const res = getRemovedContestants(districtNum, contestantNumToRemove, paths);
          expect(res).to.deep.equal(expectedRes);
        });
      });
    });
  });
});
