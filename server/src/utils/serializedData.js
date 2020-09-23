module.exports = (data) => {
  return data.map((contact) => {
    return {
      ...contact.dataValues,
      image: `http://192.178.31.105:3333/uploads/${contact.dataValues.image}`,
    };
  });
};
