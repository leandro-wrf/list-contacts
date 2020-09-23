const serializedData = require('../../src/utils/serializedData');

test('it should return an object with image on format url', () => {
  const data = [
    {
      dataValues: {
        first_name: 'leandro',
        image: 'image',
      },
    },
  ];

  const serialized = serializedData(data);

  expect(serialized[0].image).toBe('http://192.178.31.105:3333/uploads/image');
});
