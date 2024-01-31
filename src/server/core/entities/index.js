const services = require('../services');
const actionHandler = require('../controller/actionHandler');
const { messageBuffer } = require('../controller/gameController');

class Movable {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }

    move(direction, delta) {
        const directionNorm = services.unit_vector(services.diff_vector(direction, this.position));

        this.x += directionNorm.x * this.velocity * delta;
        this.y += directionNorm.y * this.velocity * delta;
    }
};

class Healable {
    constructor(health) {
        this.health = health;
    }

    increase(value) {
        this.health += value;
    }

    decrease(value) {
        this.health -= value;
    }

    isDead() {
        return this.health <= 0;
    }
};

class BitMask {
    constructor() {
        this.bits = 0; // 16 bits
    }

    setBit(index) {
        this.bits |= (1 << index);
    }

    clear() {
        this.bits = 0;
    }

    getMask() {
        return this.bits;
    }
}

class Entity {
    constructor(position, radius, velocity, health, id) {
        this.movable  = new Movable(position, velocity);
        this.healable = new Healable(health);
        this.state    = new BitMask();
        this.radius   = radius;
        this.id       = id;
    }
    
    update(delta) {
        const commands = messageBuffer.filter(this.id);
        commands.forEach((command) => {
            actionHandler(this, command);
        });
    }

    static create(position, radius, velocity, health, id) {
        return new Entity(position, radius, velocity, health, id);
    }
};

class Projectile {
    constructor(position, radius, velocity, senderId) {
        this.movable  = new Movable(position, velocity);
        this.radius = radius;
        this.senderId = senderId;
    }

    update(delta) {

    }
};

module.exports = {
    Entity,
    Projectile,
}