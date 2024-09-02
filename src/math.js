function lerp(a, b, t) {
    return (b - a) * t + a
}

function lerpSmooth(a, b, dt, r) {
    return lerp(a, b, Math.exp(-r * dt))
}