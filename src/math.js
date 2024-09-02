function lerp(a, b, t) {
    return (b - a) * t + a
}

function lerpSmooth(value, target, deltaTime, rate) {
    return lerp(target, value, Math.exp(-rate * deltaTime))
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