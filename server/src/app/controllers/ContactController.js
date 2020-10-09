const { Contact } = require('../models');
const Queue = require('../jobs');
const serializedData = require('../../utils/serializedData');
const stringToArray = require('../../utils/stringToArray');

class ContactController {
  async index(request, response) {
    const { page } = request.params;
    const pageCurrent = Number(page) - 1;

    const data = await Contact.findAll({
      limit: 9,
      offset: pageCurrent * 9,
    });

    const newData = serializedData(data);

    return response.status(200).json(newData);
  }

  async create(request, response) {
    const user = request.body;

    user.image = !request.file ? 'noimage' : request.file.filename;

    const { data } = await Queue.add('RegisterContact', user);

    return response.status(201).json(data);
  }

  async update(request, response) {
    const { id } = request.params;
    const data = request.body;

    data.image = !request.file ? 'noimage' : request.file.filename;

    Contact.update(
      {
        image: data.image,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        uf: data.uf,
        city: data.city,
      },
      {
        where: {
          id,
        },
      }
    ).then(function (result) {
      if (!result[0]) {
        return response.status(404).json({
          message: 'Contact no exists',
        });
      }

      return response.status(200).json(result);
    });
  }

  async destroy(request, response) {
    const { id } = request.params;

    const arrayIds = stringToArray(id);

    if (!(await Contact.destroy({ where: { id: arrayIds } }))) {
      return response.status(404).json({
        message: 'Contact no exists',
      });
    }

    return response.status(204).send();
  }
}

module.exports = new ContactController();
