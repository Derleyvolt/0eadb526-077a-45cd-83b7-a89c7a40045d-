const gameController = require('./core/controller/gameController');
const {Timer} = require('../shared/services/timer');

require('./core/connection');

let start;
let elapsed = 0.05;
let tick = 0;
const hertz = 20;

const simulation = () => {
    if(tick) {
        gameController.update(elapsed);
        gameController.updateGameState();
        elapsed = start.elapsed('ms');
    } else {
        start = new Timer();
        tick++;
    }
}

setInterval(simulation, hertz);