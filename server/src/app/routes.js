const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const ContactController = require('./controllers/ContactController');

const routes = Router();
const upload = multer(multerConfig);

routes
  .get('/contacts/page/:page', ContactController.index)
  .post('/contact', upload.single('image'), ContactController.create)
  .put('/contact/:id', upload.single('image'), ContactController.update)
  .delete('/contact/:id', ContactController.destroy);

module.exports = routes;
