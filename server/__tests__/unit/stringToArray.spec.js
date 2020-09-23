const stringToArray = require('../../src/utils/stringToArray');

test('it should return an array', () => {
  const arr = stringToArray('1,2,3,5');

  expect(arr).toEqual(expect.arrayContaining(arr));
});
