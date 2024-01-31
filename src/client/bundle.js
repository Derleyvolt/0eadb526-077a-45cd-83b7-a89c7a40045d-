(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
const {Timer} = require('../../../shared/services/timer');
const services = require('../../../shared/services');
const {Entity} = require('../../../shared/object');
const StoreEntity = require('../../../shared/store/entities');

const updateDirectionTimer = new Timer('1s');

let start = false;

const randomEntity = () => {
    return new Entity(services.makePoint(services.randomBetween(0, 800), services.randomBetween(0, 800)), 10);
}

global.localStore = StoreEntity;

StoreEntity.add(1, randomEntity());
StoreEntity.add(2, randomEntity());

StoreEntity.getEntities().forEach((entity) => {
    do {
        entity.direction = services.makePoint(services.randomBetween(0, 800), services.randomBetween(0, 800));
    } while(services.magntude(entity.direction, entity.position) < 20);
});

const update = (delta) => {
    // update all entities
    // check for collisions
    // check for out of bounds

    StoreEntity.getEntities().forEach((entity) => {
        if(updateDirectionTimer.ready()) {
            do {
                entity.direction = services.makePoint(services.randomBetween(0, 800), services.randomBetween(0, 800));
            } while(services.magntude(entity.direction, entity.position) < 100);
            console.log(services.magntude(entity.direction, entity.position));
        }

        entity.move(entity.direction, delta);
    });

    updateDirectionTimer.ready(true);
}

const draw = () => {
    StoreEntity.getEntities().forEach((entity) => {
        entity.draw();
    });
}

module.exports = {
    update,
    draw,
}
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../shared/object":7,"../../../shared/services":8,"../../../shared/services/timer":9,"../../../shared/store/entities":10}],2:[function(require,module,exports){
const { inputType } = require('../../../shared/constants');

let inputQueue = new Set();

window.keyPressed = () => {
    switch(keyCode) {
        case 87: {
            inputQueue.add(inputType.MOVE);
        }
    }
}

window.keyReleased = () => {
    switch(keyCode) {
        case 87: {
            inputQueue.delete(inputType.MOVE);
        }
    }
}

module.exports = {
    inputQueue,
}
},{"../../../shared/constants":5}],3:[function(require,module,exports){
(function (global){(function (){
const { Timer, eventTimer } = require('../../../shared/services/timer');
const services = require('../../../shared/services');
const { Entity } = require('../../../shared/object');
const { inputQueue } = require('./inputController');
const { inputType } = require('../../../shared/constants');
const { isMoveValid } = require('../../../shared/controller/gameController');
const { packetType } = require('../../../shared/constants');

global.myObject = new Entity(services.makePoint(20, 20), 10);

let sequenceNumber = 0;
let packetBuffer  = [];
let historyBuffer = new Map();

const addHistoryBuffer = (key, sequence, state) => {
    if(!historyBuffer.has(key)) {
        historyBuffer.set(key, []);
    }

    historyBuffer.get(key).push({
        sequence: sequence,
        state,
        exp: new Timer('5m'),
    });
}

const dispatchInput = () => {
    if(packetBuffer.length > 0) {
        socket.send(JSON.stringify({
            type: packetType.REPLICATION_DATA,
            data: JSON.stringify(packetBuffer),
        }));

        packetBuffer = [];
    }
}

const processInput = (delta) => {
    if(inputQueue.has(inputType.MOVE)) {
        eventTimer.create(inputType.MOVE, '10ms');

        if(eventTimer[inputType.MOVE].ready(true)) {
            if(isMoveValid(myObject, services.makePoint(1, 1), delta)) {
                myObject.move(services.getMousePosition(), delta);

                addHistoryBuffer(packetType.MOVE, sequenceNumber, {
                    cursor_position: [mouseX, mouseY],
                });
    
                packetBuffer.push({
                    type: packetType.MOVE,
                    sequenceNumber,
                    data: {
                        cursor_position: [mouseX, mouseY],
                    }
                });

                sequenceNumber++;
            }
        }
    }
}

module.exports = {
    processInput,
    dispatchInput,
    myObject,
}
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../shared/constants":5,"../../../shared/controller/gameController":6,"../../../shared/object":7,"../../../shared/services":8,"../../../shared/services/timer":9,"./inputController":2}],4:[function(require,module,exports){
(function (global){(function (){
let gameState = false; // 0 = stoped, 1 = playing

const { Entity } = require('../shared/object');
const { processInput, myObject } = require('./core/controller/playerController');
const { inputQueue } = require('./core/controller/inputController');
const { Timer } = require('../shared/services/timer');
const services = require('../shared/services');
const { update, draw } = require('./core/controller/gameController');

window.setup = () => {
    createCanvas(800, 800);
    gameState = true;
}

// let startt = new Date();

global.elapsed = 0.016;
let start = new Date();

window.draw = () => {
    background(220);

    if(gameState) {
        processInput(elapsed);
        update(elapsed);
        draw();
        circle(myObject.position.x, myObject.position.y, myObject.radius);
    }

    elapsed = (new Date() - start) / 1000;
    start = new Date();
    //console.log(elapsed);
}
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../shared/object":7,"../shared/services":8,"../shared/services/timer":9,"./core/controller/gameController":1,"./core/controller/inputController":2,"./core/controller/playerController":3}],5:[function(require,module,exports){
const packetType = {
    MOVE: 'MOVE',
    DIRECTION: 'DIRECTION',
    NEW_PLAYER: 'NEW_PLAYER',
    REPLICATION_DATA: 'REPLICATION_DATA',
};

const inputType = {
    MOVE: 'MOVE',
}

module.exports = {
    packetType,
    inputType,
}
},{}],6:[function(require,module,exports){
const services = require('../services');

const isMoveValid = (entity, direction, delta) => {
    const entityPos = entity.get_position();
    const normalizedDir = services.unit_vector(services.diff_vector(direction, entityPos));
    const fakeVelocity = 5;
    const newPos = services.makePoint(entityPos.x + fakeVelocity * normalizedDir * delta, entityPos.y + fakeVelocity * normalizedDir * delta);
    return true;
    // check if newPos is a valid move
}

module.exports = {
    isMoveValid,
}
},{"../services":8}],7:[function(require,module,exports){
const services = require('./services');

class Entity {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
        this.velocity = 100;
    }

    draw() {
        circle(this.position.x, this.position.y, this.radius);
    }

    get_position() {
        return this.position;
    }

    set_position(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    move(direction, delta) {
        const normalizedDir = services.unit_vector(services.diff_vector(direction, this.position));
        const newPos = services.makePoint(this.position.x + this.velocity * normalizedDir.x * delta, this.position.y + this.velocity * normalizedDir.y * delta);
        this.position = newPos;
    }
}

module.exports = {
    Entity,
}
},{"./services":8}],8:[function(require,module,exports){
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const sum_vector = (p1, p2) => {
    return new Point(p1.x+p2.x, p1.y+p2.y);
}

const diff_vector = (p1, p2) => {
    return new Point(p1.x-p2.x, p1.y-p2.y);
}

const unit_vector = (p) => {
    const distance = magntude(new Point(0, 0), p);
    return new Point(p.x/distance, p.y/distance);
}

const magntude = (p1, p2) => {
    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}

const direction = (myObject) => {
    const [x, y] = myObject.getPosition();
}

const makePoint = (x, y) => {
    return new Point(x, y);
}

const getMousePosition = () => {
    return makePoint(mouseX, mouseY);
}

const randomBetween = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
    // [0 .. 0.999] * (max-min): min = 0, max= max-min
}

function assert(expr, message) {
    if(!Boolean(expr)) {
        throw new Error(message || 'unknown assertion error');
    }
}

module.exports = {
    Point,
    assert,
    magntude,
    direction,
    makePoint,
    sum_vector,
    diff_vector,
    unit_vector,
    randomBetween,
    getMousePosition,
}
},{}],9:[function(require,module,exports){
class Timer {
    constructor(time) {
        this.start = new Date();
        this.elapsed_time = this.to_milliseconds(time);
    }

    to_milliseconds(time) {
        const result = time.match(/^(\d+)(ms|s|m|h)$/);
        const time_unit = result[2];
        const unit      = result[1];
        return unit * (time_unit == 's' ? 1000 : time_unit == 'm' ? 60000 : time_unit == 'h' ? 3600000 : 1);
    }

    ready(auto_reset = false) {
        const res = (new Date() - this.start) >= this.elapsed_time;
        if(res) {
            if(auto_reset) {
                this.start = new Date();
            }
        }

        return res;
    }

    reset() {
        this.start = new Date();
    }

    elasped() {
        return new Date() - this.start;
    }
};

const eventTimer = {
    create(keyCode, time) {
        if(this[keyCode] === undefined) {
            this[keyCode] = new Timer(time);
        }
    }
};

module.exports = {
    Timer,
    eventTimer,
}
},{}],10:[function(require,module,exports){
class StoreEntity {
    constructor() {
        this.entities = new Map();
    }

    add(id, entity) {
        this.entities.set(id, entity);
    }

    remove(id) {
        this.entities.delete(id);
    }
    
    getEntities() {
        return [...this.entities.values()];
    }
}

module.exports = new StoreEntity();
},{}]},{},[4]);
