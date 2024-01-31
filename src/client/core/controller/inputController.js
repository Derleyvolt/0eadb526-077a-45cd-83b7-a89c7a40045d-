const {inputType} = require('../../../shared/constants');

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