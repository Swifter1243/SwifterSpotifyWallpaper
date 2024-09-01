import { canvas, context, resizeCanvas } from './canvas.js'

window.onload = setup

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

    context.font = '300px Minecraft'
    context.textBaseline = 'top';
    context.fillStyle = '#FFF'
    context.fillText('real', 30, 30)

    // context.fillRect(0, 0, 200, 200)
}