let canvas = null
let context = null

setup()

function setup() {
    initializeContext()
    attachAudioListener()
    // queueFrame()
}

function initializeContext() {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function attachAudioListener() {
    window.wallpaperRegisterAudioListener(drawAudio)
}

function queueFrame() {
    window.requestAnimationFrame(onFrame)
}

function onFrame() {
    queueFrame()
    drawGraphics()
}