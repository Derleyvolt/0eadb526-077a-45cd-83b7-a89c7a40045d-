const services = require('./services');

class Entity {
    constructor(position, radius, velocity, id) {
        this.position = position;
        this.radius = radius;
        this.velocity = velocity;
        this.id = id;
    }

    draw() {
        circle(this.position.x, this.position.y, this.radius);
    }

    get_position() {
        return this.position;
    }

    set_position(position) {
        this.position = position;
    }

    move(direction, delta) {
        const normalizedDir = services.unit_vector(services.diff_vector(direction, this.position));
        const newPos = services.makePoint(this.position.x + this.velocity * normalizedDir.x * delta, this.position.y + this.velocity * normalizedDir.y * delta);
        this.set_position(newPos);
    }

    serialized() {
        return {
            id: this.id,
            position: this.position,
            radius: this.radius,
            velocity: this.velocity,
        }
    }
}

const createEntity = (position, radius, velocity, id) => {
    return new Entity(position, radius, velocity, id);
}

module.exports = {
    Entity,
    createEntity,
}