const multer = require('multer');
const path = require('path');
const hashToFile = require('../utils/createHash');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(request, file, callback) {
      const hash = hashToFile();

      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
