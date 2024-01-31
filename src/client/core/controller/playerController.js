const {Timer, eventTimer} = require('../../../shared/services/timer');
const services = require('../../../shared/services');
const {createEntity} = require('../../../shared/object');
const {inputQueue} = require('./inputController');
const {inputType} = require('../../../shared/constants');
const {isMoveValid} = require('../../../shared/controller/gameController');
const {packetType} = require('../../../shared/constants');
const StoreEntity = require('../../../shared/store/entities');

const myEntity = {
    
};

let packetBuffer = {
    buffer: [],
    sequence: 0,
    add: function(packet) {
        this.buffer.push(packet);
    },
    dispatch: function() {
        if(this.buffer.length) {
            socket.send(JSON.stringify({
                type: packetType.REPLICATION_DATA,
                data: JSON.stringify(this.buffer),
            }));
    
            this.buffer = [];
        }
    }
};

const historyBuffer = {
    buffer: new Map(),
    sequence: 0,
    add: function(key, state) {
        if(!this.buffer.has(key)) {
            this.buffer.set(key, []);
        }
    
        this.buffer.get(key).push({
            sequence: this.sequence++,
            state,
            exp: new Timer('5m'),
        });
    },
    clear: function() {
        // clear out dated states
    }
};

const processInput = (delta) => {
    if(inputQueue.has(inputType.MOVE)) {
        eventTimer.create(inputType.MOVE, '10ms');

        if(eventTimer[inputType.MOVE].ready(true)) {
            if(isMoveValid(myObject, services.makePoint(1, 1), delta)) {
                const myEntity = StoreEntity.getEntity();

                myObject.move(services.getMousePosition(), delta);

                historyBuffer.add(packetType.MOVE, {
                    cursor_position: [mouseX, mouseY],
                });

                packetBuffer.add({
                    type: packetType.MOVE,
                    data: {
                        cursor_position: [mouseX, mouseY],
                    }
                });
            }
        }
    }
}

module.exports = {
    processInput,
    myObject,
}