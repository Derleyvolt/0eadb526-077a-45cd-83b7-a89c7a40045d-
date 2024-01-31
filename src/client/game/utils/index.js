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