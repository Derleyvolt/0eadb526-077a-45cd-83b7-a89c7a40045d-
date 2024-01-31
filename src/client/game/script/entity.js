class Entity {
    constructor(position, radius, velocity, direction) {
        this.direction = direction;
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
    }

    draw() {
        circle(this.position.x, this.position.y, this.radius);
    }

    set_direction(direction) {
        this.direction = direction;
    }

    get_position() {
        return this.position;
    }

    set_position(position) {
        this.position = position;
    }

    translate(x, y) {
        this.position.x += x;
        this.position.y += y;
    }

    set_velocity(velocity) {
        this.velocity = velocity;
    }

    get_velocity() {
        return this.velocity;
    }

    scaling(factor) {
        this.radius *= factor;
    }
}