const express = require('express');
const cors = require('cors');
const path = require('path');

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(require('./routes'));
    this.express.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', '..', 'uploads'))
    );
  }
}

module.exports = new AppController().express;
