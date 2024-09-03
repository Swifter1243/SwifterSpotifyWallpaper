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

function clamp01(x) {
    return Math.max(0, Math.min(x, 1))
}

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function colorToCSS(color) {
    const intColor = color.split(' ').map(c => Math.ceil(c * 255));
    return 'rgb(' + intColor + ')';
}

function formatTimestamp(seconds) {
    function makeFixed(number) {
        if (number >= 10) {
            return number
        } else {
            return `0${number}`
        }
    }

    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    if (h > 0) {
        return `${h}:${makeFixed(m)}:${makeFixed(s)}`
    } else if (m > 0) {
        return `${m}:${makeFixed(s)}`
    } else {
        return `0:${makeFixed(s)}`
    }
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