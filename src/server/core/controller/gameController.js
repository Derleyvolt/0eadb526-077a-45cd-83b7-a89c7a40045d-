const StoreEntity = require('../../../shared/store/entities');
const {createEntity} = require('../../../shared/object');
const services = require('../../../shared/services');
const {actionHandler} = require('./actionController');

const messageBuffer = {
    buffer: [],
    add: function(message) {
        this.buffer.push(message);
    },
    clear: function() {
        this.buffer = [];
    },
    filter: function(clientId) {
        return this.buffer.filter(message => message.clientId === clientId);
    }
}

const update = (delta) => {
    // execute the client inputs
    // check by collision detection

    const entities = StoreEntity.getEntities();
    
    entities.forEach(entity => {
        entity.update(delta);
    });

    messageBuffer.clear();
}

const updateGameState = () => {
    // send to all users game state
}

module.exports = {
    update,
    messageBuffer,
    updateGameState,
}