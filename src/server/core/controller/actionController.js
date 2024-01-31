const {packetType} = require('../../../shared/constants');
const services = require('../../../shared/services');

const handleMovement = (player, command) => {
    const [x, y] = command.cursor_position;
    player.movable.move(services.Point.create(x, y), command.delta);
}

const actionHandler = (player, command) => {
    switch (command.type) {
        case packetType.MOVE: {
            handleMovement(player, command.data);
        }
    }
}

module.exports = {
    actionHandler,
}