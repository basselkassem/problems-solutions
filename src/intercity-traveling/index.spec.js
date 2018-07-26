const { expect } = require('chai');
const sut = require('./index');

describe('Intercity-Travelling Solution', () => {
  describe('computeRestSitesIndexs', () => {
    describe('when distrbution = [1, 0, 1, 0, 1]', () => {
      it('returns [1, 1, 2, 1, 2, 1]', () => {
        const distrbution = [1, 0, 1, 0, 1];
        const expectedRes = [1, 1, 2, 1, 2, 1];
        expect(sut.computeRestSitesIndexs(distrbution)).to.deep.equal(expectedRes);
      });
    });
    describe('when distrbution = [1, 0, 0, 1, 0, 2]', () => {
      it('returns [1, 1, 2, 3, 1, 2]', () => {
        const distrbution = [1, 0, 0, 1, 0];
        const expectedRes = [1, 1, 2, 3, 1, 2];
        expect(sut.computeRestSitesIndexs(distrbution)).to.deep.equal(expectedRes);
      });
    });
    describe('when distrbution = [1, 0]', () => {
      it('returns [1, 1, 2]', () => {
        const distrbution = [1, 0];
        const expectedRes = [1, 1, 2];
        expect(sut.computeRestSitesIndexs(distrbution)).to.deep.equal(expectedRes);
      });
    });
    describe('when distrbution = [1, 1]', () => {
      it('returns [1, 1, 1]', () => {
        const distrbution = [1, 1];
        const expectedRes = [1, 1, 1];
        expect(sut.computeRestSitesIndexs(distrbution)).to.deep.equal(expectedRes);
      });
    });
    describe('when distrbution = [0, 1, 0, 0, 0]', () => {
      it('returns [1, 2, 1, 2, 3, 4]', () => {
        const distrbution = [0, 1, 0, 0, 0];
        const expectedRes = [1, 2, 1, 2, 3, 4];
        expect(sut.computeRestSitesIndexs(distrbution)).to.deep.equal(expectedRes);
      });
    });
  });
  describe('computeDistributionDifficulty', () => {
    describe('when difficultyArray = [1, 2] , distribution = [1, 0];', () => {
      it('return 2', () => {
        const difficultyArray = [1, 2];
        const distribution = [1];
        expect(sut.computeDistributionDifficulty(difficultyArray, distribution)).to.be.equal(2);
      });
    });
    describe('when difficultyArray = [1, 2] , distribution = [1, 1];', () => {
      it('return 3', () => {
        const difficultyArray = [1, 2];
        const distribution = [1, 1];
        expect(sut.computeDistributionDifficulty(difficultyArray, distribution)).to.be.equal(3);
      });
    });
  });
  describe('computeDifficulty', () => {
    it('return 5', () => {
      const distance = 2;
      const difficultyArray = [1, 2];
      expect(sut.computeDifficulty(distance, difficultyArray)).to.be.equal(5);
    });
    it('return 60', () => {
      const distance = 4;
      const difficultyArray = [1, 3, 3, 7];
      expect(sut.computeDifficulty(distance, difficultyArray)).to.be.equal(60);
    });
    it('return 12', () => {
      const distance = 1;
      const difficultyArray = [12];
      expect(sut.computeDifficulty(distance, difficultyArray)).to.be.equal(12);
    });
    it.skip('return 758086002', () => {
      const distance = 100;
      const difficultyArray = [3, 3, 3, 4, 7, 8, 8, 8, 9, 9, 10, 12, 12, 13, 14, 14, 15, 15, 16, 17, 17, 20, 21, 21, 22, 22, 23, 25, 29, 31, 36, 37, 37, 38, 39, 40, 41, 41, 41, 42, 43, 44, 45, 46, 46, 47, 47, 49, 49, 49, 51, 52, 52, 53, 54, 55, 59, 59, 59, 60, 62, 63, 63, 64, 66, 69, 70, 71, 71, 72, 74, 76, 76, 77, 77, 78, 78, 79, 80, 81, 81, 82, 82, 84, 85, 86, 87, 87, 87, 89, 91, 92, 92, 92, 92, 97, 98, 99, 100, 100];
      expect(sut.computeDifficulty(distance, difficultyArray)).to.be.equal(60);
    });
  });
});
