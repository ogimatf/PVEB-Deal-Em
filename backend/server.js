require('dotenv').config();

const port = process.env.PORT;
const server = require('./source/app.js');

server.listen(port);
server.once('listening', () => {
    console.log(`Listening on port: ${port}`);
});
