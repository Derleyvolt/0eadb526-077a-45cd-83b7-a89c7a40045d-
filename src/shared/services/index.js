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

const randomPosition = (h, w) => {
    return makePoint(randomBetween(0, w), randomBetween(0, h));
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
    randomPosition,
    getMousePosition,
}