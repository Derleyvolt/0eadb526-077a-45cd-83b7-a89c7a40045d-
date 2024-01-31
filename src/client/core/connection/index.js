const socket = require('./connection');
const clientController = require('../controller/clientController');

socket.onmessage = function(message) {
    const data = JSON.parse(message.data);
    clientController.messageHandler(data);
}