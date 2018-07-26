const { expect } = require('chai');
const sut = require('./index');

describe.only('mini-merto solution', () => {
  it('works', () => {
    expect(sut.test()).to.equal(true);
  });
});
