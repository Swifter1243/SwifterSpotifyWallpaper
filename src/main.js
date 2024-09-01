setup()

function setup() {
    resizeCanvas()
    queueNextFrame()
}

function queueNextFrame() {
    window.requestAnimationFrame(draw)
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    queueNextFrame()
    clear()
    drawGraphics()
}