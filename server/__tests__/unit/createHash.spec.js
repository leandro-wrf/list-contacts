const createHash = require('../../src/utils/createHash');

test('it should return an hash in hex', () => {
  expect(createHash()).toHaveLength(12);
});
