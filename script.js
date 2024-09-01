const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

window.onload = setup

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}

function setup() {
    resizeCanvas()

    queueNextFrame()
}

function queueNextFrame() {
    window.requestAnimationFrame(draw)
}

function draw() {
    queueNextFrame()

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText('balls', 300, 300)
}