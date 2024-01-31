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

const eventTimer = {
    create(keyCode, time) {
        if(this[keyCode] === undefined) {
            this[keyCode] = new Timer(time);
        }
    }
};

module.exports = {
    Timer,
    eventTimer,
}