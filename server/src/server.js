const server = require('./app/index');

const PORT = 3333;

server.listen(PORT, () => console.log(`Server is running: ${PORT}`));
