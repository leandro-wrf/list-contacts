const path = require('path');

module.exports = {
  development: {
    username: "docker",
    password: "docker",
    database: "entrevista_node",
    host: "localhost",
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false
  },
  test: {
    storage: path.resolve(__dirname, '..', 'database', 'test.sqlite'),
    host: "localhost",
    dialect: "sqlite",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    logging: false
  },
};
