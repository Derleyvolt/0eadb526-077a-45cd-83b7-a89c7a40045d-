const { v4: uuid } = require('uuid');

class Timer {
    constructor(time) {
        this.start = new Date();
        this.elapsed_time = this.to_milliseconds(time);
    }

    to_milliseconds(time) {
        if(time) {
            const result = time.match(/^(\d+)(ms|s|m|h)$/);
            const timeUnit = result[2];
            const unit      = result[1];
            return unit * (timeUnit == 's' ? 1000 : timeUnit == 'm' ? 60000 : timeUnit == 'h' ? 3600000 : 1);
        }
    }

    ready(auto_reset = false) {
        const res = (new Date() - this.start) >= this.elapsed_time;
        if(res) {
            if(auto_reset) {
                this.start = new Date();
            }
        }

        return res;
    }

    reset() {
        this.start = new Date();
    }

    elapsed(timeUnit) {
        const elapsed = new Date() - this.start;

        return timeUnit == 'ms' ? elapsed : elapsed/1000;
    }
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static create(x, y) {
        return new Point(x, y);
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
    uuid,
    Timer,
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
};