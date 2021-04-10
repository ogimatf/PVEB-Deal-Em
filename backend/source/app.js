const handler = require('./socketHandler')
const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http);

io.on('connection', handler);

module.exports = http
