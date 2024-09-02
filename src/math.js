function lerp(a, b, t) {
    return (b - a) * t + a
}

function lerpSmooth(value, target, deltaTime, rate) {
    return lerp(target, value, Math.exp(-rate * deltaTime))
}

function softClip(value, power) {
    if (value > 1) {
        return Math.pow(value, power)
    } else {
        return value
    }
}

function colorToCSS(color) {
    const intColor = color.split(' ').map(c => Math.ceil(c * 255));
    return 'rgb(' + intColor + ')';
}

class Timer {
    lastTime

    constructor() {
        this.lastTime = performance.now()
    }

    mark() {
        const currentTime = performance.now()
        const differenceMs = (currentTime - this.lastTime) / 1000
        this.lastTime = currentTime
        return Math.min(differenceMs, 1)
    }
}