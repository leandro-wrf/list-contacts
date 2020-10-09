const { Contact } = require('../models');

module.exports = {
  key: 'RegisterContact',
  async handle({ data }) {
    return await Contact.create(data);
  },
};
