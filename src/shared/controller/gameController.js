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