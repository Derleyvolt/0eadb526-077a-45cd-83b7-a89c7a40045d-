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