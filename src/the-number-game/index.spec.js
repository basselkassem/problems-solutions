/* eslint-disable no-plusplus, no-new-object, no-cond-assign */

const { expect } = require('chai');
const {
  generateCombination, isConnected, getRemovedContestants, buildTree, getTotalFans,
} = require('./index');

describe('Solution', () => {
  describe('isConnected', () => {
    it('should return true when paths = [[0, 1], [1, 2], [2, 3], [1, 7]]', () => {
      const verticesNum = 5;
      const paths = [[0, 1], [1, 2], [2, 3], [1, 4]];
      const tree = buildTree(verticesNum, paths);
      const expectIsConnected = isConnected(tree, verticesNum);
      expect(expectIsConnected).to.equal(true);
    });
    it('should return true when paths = [[0, 1], [2, 0]];', () => {
      const verticesNum = 3;
      const paths = [[0, 1], [2, 0]];
      const tree = buildTree(verticesNum, paths);
      const expectIsConnected = isConnected(tree, verticesNum);
      expect(expectIsConnected).to.equal(true);
    });
    it('should return false when paths = [[0, 1], [2, 3]]', () => {
      const verticesNum = 4;
      const paths = [[0, 1], [2, 3]];
      const tree = buildTree(verticesNum, paths);
      const expectIsConnected = isConnected(tree, verticesNum);
      expect(expectIsConnected).to.equal(false);
    });
  });
  describe('getTotalFans', () => {
    describe('when paths = [2 5, 5 6]', () => {
      // const verticesNum = 3;
      // const paths = [[0, 1], [2, 0]];
      // const tree = buildTree(verticesNum, paths);
      const vertices = [1, 4, 5];
      const expectTotalFans = getTotalFans(vertices);
      it('should return 100', () => {
        expect(expectTotalFans).to.equal(100);
      });
    });
    describe('when paths = [1 3, 1 4]', () => {
      // const vertex1 = 1;
      // const vertex3 = 3;
      // const vertex4 = 4;
      // const paths = [{ a: vertex1, b: vertex3 }, { a: vertex1, b: vertex4 }];
      // const tree = buildTree(paths);

      const vertices = [0, 2, 3];
      const expectTotalFans = getTotalFans(vertices);
      it('should return 26', () => {
        expect(expectTotalFans).to.equal(26);
      });
    });
  });
  describe('generateCombination', () => {
    describe('when array = [{a:2,b:1},{a:2,b:6},{a:4,b:2},{a:5,b:6},{a:2,b:3}],length = 2', () => {
      it('should return 10 correct combinations', () => {
        const array = [{ a: 2, b: 1 }, { a: 2, b: 6 },
          { a: 4, b: 2 }, { a: 5, b: 6 }, { a: 2, b: 3 }];
        const res = generateCombination(array, 2);
        const expectRes = [[{ a: 2, b: 1 }, { a: 2, b: 6 }],
          [{ a: 2, b: 1 }, { a: 4, b: 2 }],
          [{ a: 2, b: 6 }, { a: 4, b: 2 }],
          [{ a: 2, b: 1 }, { a: 5, b: 6 }],
          [{ a: 2, b: 6 }, { a: 5, b: 6 }],
          [{ a: 4, b: 2 }, { a: 5, b: 6 }],
          [{ a: 2, b: 1 }, { a: 2, b: 3 }],
          [{ a: 2, b: 6 }, { a: 2, b: 3 }],
          [{ a: 4, b: 2 }, { a: 2, b: 3 }],
          [{ a: 5, b: 6 }, { a: 2, b: 3 }]];
        expect(res.length).to.equal(10);
        expect(res).to.deep.equal(expectRes);
      });
    });
  });
  describe('getRemovedContestants', () => {
    describe('when paths = [2 1, 2 6, 4 2, 5 6, 2 3]', () => {
      describe('when districtNum = 6 & contestantNumToRemove = 3', () => {
        it('should returns [1 3 4]', () => {
          const districtNum = 6; const contestantNumToRemove = 3;
          const paths = [{ a: 2, b: 1 }, { a: 2, b: 6 },
            { a: 4, b: 2 }, { a: 5, b: 6 }, { a: 2, b: 3 }];
          const expectedRes = [1, 3, 4];
          const res = getRemovedContestants(districtNum, contestantNumToRemove, paths);
          expect(res).to.equal(expectedRes);
        });
      });
    });
  });
});
