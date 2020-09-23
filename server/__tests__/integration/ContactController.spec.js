const request = require('supertest');
const app = require('../../src/app/index');
const path = require('path');

const { Contact } = require('../../src/app/models');

const truncate = require('../utils/truncate');

describe('Testing ContactController', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return success', async () => {
    const response = await request(app).get('/contacts');

    expect(response.status).toEqual(200);
  });

  it('should create an contact', async () => {
    const response = await request(app)
      .post('/contact')
      .field('first_name', 'leandro')
      .field('last_name', 'ferreira')
      .field('phone', '81992584015')
      .field('email', 'leandro.ferreira.wr@gmail.com')
      .field('uf', 'PE')
      .field('city', 'Caruaru')
      .attach(
        'image',
        path.resolve(__dirname, '..', 'fixtures', 'github-perfil.jpg')
      );

    expect(response.status).toEqual(201);
  });

  it('should updated an contact', async () => {
    const contact = await Contact.create({
      first_name: 'leh',
      last_name: 'fer',
      phone: '11',
      email: 'lll',
      uf: 'PE',
      city: 'Caruaru',
    });

    const response = await request(app)
      .put(`/contact/${contact.id}`)
      .field('first_name', 'lea')
      .field('last_name', 'ferreira')
      .field('phone', '81992584015')
      .field('email', 'leandro.ferreira.wr@gmail.com')
      .field('uf', 'PE')
      .field('city', 'Caruaru')
      .attach(
        'image',
        path.resolve(__dirname, '..', 'fixtures', 'github-perfil.jpg')
      );

    expect(response.status).toEqual(200);
  });

  it('should upadted an contact but id no exists', async () => {
    const response = await request(app).put('/contact/23');

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('message');
  });

  it('should delete an contact', async () => {
    const contact = await Contact.create({
      first_name: 'leh',
      last_name: 'fer',
      phone: '11',
      email: 'lll',
      uf: 'PE',
      city: 'Caruaru',
    });

    const response = await request(app).del(`/contact/${contact.id}`);

    expect(response.status).toEqual(204);
  });

  it('should return an message of contact no exists', async () => {
    const response = await request(app).del('/contact/23');

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('message');
  });
});
