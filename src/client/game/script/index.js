let game_state = false; // 0 = stoped, 1 = playing

let my_object;
let entities = [];

function setup() {
    createCanvas(800, 800);
    my_object = new Entity(new Point(10, 10), 30, new Point(4, 4), new Point(0, 0));
    game_state = true;
}

let start = new Date();

function draw() {
    console.log('elapsed time: ', new Date() - start, 'ms');
    start = new Date();
    background(220);

    if(game_state) {
        my_object.draw();
        input_handler();
    }
}