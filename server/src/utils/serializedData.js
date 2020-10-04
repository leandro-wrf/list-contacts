module.exports = (data) => {
  return data.map((contact) => {
    return {
      ...contact.dataValues,
      image: `http://localhost:3333/uploads/${contact.dataValues.image}`,
    };
  });
};
