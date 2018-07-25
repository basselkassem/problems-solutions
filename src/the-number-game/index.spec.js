/* eslint-disable no-plusplus, no-new-object, no-cond-assign */

const { expect } = require('chai');
const {
  generateCombination, isConnected, pathEdgeMapper, getRemovedContestants, buildGraph, getTotalFans,
} = require('./index');

describe('Solution', () => {
  describe.only('isConnected', () => {
    // it('assert equality', () => {
    //   const vertex2 = 2;
    //   const vertex6 = 6;
    //   const vertex5 = 5;
    //   const paths = [{ a: vertex2, b: vertex6 }, { a: vertex5, b: vertex6 }];
    //   const graph = buildGraph(paths);
    //   const dpaths = [{ a: 2, b: 6 }, { a: 5, b: 6 }];
    //   const possiblePaths = generateCombination(dpaths, 0);
    //   const possibleEdges = pathEdgeMapper(possiblePaths);
    //   const dgraph = buildGraph(possibleEdges[0]);
    //   expect(graph).to.equal(dgraph);
    // });
    it('should return true when paths = [2 6, 5 6]', () => {
      const vertex2 = 2;
      const vertex6 = 6;
      const vertex5 = 5;
      const paths = [{ a: vertex2, b: vertex6 }, { a: vertex5, b: vertex6 }];
      const graph = buildGraph(paths);
      const expectIsConnected = isConnected(graph);
      expect(expectIsConnected).to.equal(true);
    });
    it('case2: should return true when paths = [2 6, 5 6]', () => {
      const paths = [{ a: 2, b: 6 }, { a: 5, b: 6 }];
      const possiblePaths = generateCombination(paths, 0);
      const possibleEdges = pathEdgeMapper(possiblePaths);
      const graph = buildGraph(possibleEdges[0]);
      const expectIsConnected = isConnected(graph);
      expect(expectIsConnected).to.equal(true);
    });
    it('should return false when paths = [2 6, 5 7]', () => {
      const vertex2 = 2;
      const vertex6 = 6;
      const vertex5 = 5;
      const vertex7 = 7;
      const paths = [{ a: vertex2, b: vertex6 }, { a: vertex5, b: vertex7 }];
      const graph = buildGraph(paths);
      const expectIsConnected = isConnected(graph);
      expect(expectIsConnected).to.equal(false);
    });
  });
  describe('getTotalFans', () => {
    describe('when paths = [2 5, 5 6]', () => {
      const vertex2 = 2;
      const vertex6 = 6;
      const vertex5 = 5;
      const paths = [{ a: vertex2, b: vertex6 }, { a: vertex5, b: vertex6 }];
      const graph = buildGraph(paths);
      const expectTotalFans = getTotalFans(graph);
      it('should return 100', () => {
        expect(expectTotalFans).to.equal(100);
      });
    });
    describe('when paths = [1 3, 1 4]', () => {
      const vertex1 = 1;
      const vertex3 = 3;
      const vertex4 = 4;
      const paths = [{ a: vertex1, b: vertex3 }, { a: vertex1, b: vertex4 }];
      const graph = buildGraph(paths);
      const expectTotalFans = getTotalFans(graph);
      it('should return 26', () => {
        expect(expectTotalFans).to.equal(26);
      });
    });
  });
  describe('pathEdgeMapper', () => {
    it('should map paths to edges', () => {
      const array = [[{ a: 2, b: 1 }, { a: 4, b: 2 }],
        [{ a: 2, b: 6 }, { a: 4, b: 2 }]];
      const res = pathEdgeMapper(array);
      const expectRes = [[{ a: new Object(2), b: new Object(1) },
        { a: new Object(4), b: new Object(2) }], [{ a: new Object(2), b: new Object(6) },
        { a: new Object(4), b: new Object(2) }]];
      expect(res).to.deep.equal(expectRes);
    });
    it('should not map paths to edges', () => {
      const array = [[{ a: 2, b: 1 }, { a: 4, b: 2 }],
        [{ a: 2, b: 6 }, { a: 4, b: 2 }]];
      const res = pathEdgeMapper(array);
      const expectRes = [[{ a: new Object(2), b: new Object(1) },
        { a: new Object(4), b: new Object(2) }], [{ a: new Object(2), b: new Object(6) },
        { a: new Object(4), b: new Object(20) }]];
      expect(res).to.not.deep.equal(expectRes);
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
