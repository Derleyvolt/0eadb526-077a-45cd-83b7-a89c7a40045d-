const {Server} = require('ws');

const server = new Server({port: 8081});

module.exports = server;