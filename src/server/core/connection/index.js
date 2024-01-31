const server = require('../../server');
const StoreEntity = require('../../../shared/store/entities');
const sharedServices = require('../../../shared/services');
const socketService = require('../services/socket');
const {packetType} = require('../../../shared/constants');
const {messageBuffer} = require('../controller/gameController');
const services = require('../services');
const jwt = require('jsonwebtoken');

/*
    Every client request must follow this format:

    Begin payload
        token: jwt token,
        data: list of commands
    End playload
*/

server.on('connection', (socket, request) => {
    this.getNextValidId = this.getNextValidId ?? 0;

    const entity = StoreEntity.createEntity(sharedServices.randomPosition(800, 800), 10, 100, this.getNextValidId++);

    const token = jwt.sign({
        id: entity.id,
    }, 'some private key', { expiresIn: '100d' });

    socketService.send(socket, {
        type: packetType.ENTER_WORLD,
        data: {
            entity: StoreEntity.getSerializedEntity(entity.id),
        },
        token,
    });

    socket.on('message', (data) => {
        try {
            const payload = JSON.parse(data);
    
            const decoded = jwt.verify(payload.token, 'some private key');
    
            payload.data.forEach((command) => {
                command.entityId = decoded.id;
                messageBuffer.add(command);
            });
        } catch(err) {
            console.log(err);
            socket.close(1008, err.message);
        }
    });
});