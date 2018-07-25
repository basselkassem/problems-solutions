const { expect } = require('chai');
const getPossibleWays = require('./index');

describe('getPossibleWays', () => {
  describe('when w = 5 & ai = [2, 1, -3]', () => {
    it('should returns 3', () => {
      const res = getPossibleWays(5, [2, 1, -3]);
      expect(res).to.equal(3);
    });
  });
  describe('when w = 4 & ai = [1, -1]', () => {
    it('should returns 4', () => {
      const res = getPossibleWays(4, [1, -1]);
      expect(res).to.equal(4);
    });
  });
  describe('when w = 10 & ai = [2, 4, 1, 2]', () => {
    it('should returns 2', () => {
      const res = getPossibleWays(10, [2, 4, 1, 2]);
      expect(res).to.equal(2);
    });
  });
});
