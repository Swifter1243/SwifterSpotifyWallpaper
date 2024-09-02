let canvas = null
let context = null

setup()

function setup() {
    initializeContext()
    attachAudioListener()
    attachPropertyListener()
    queueFrame()
}

function initializeContext() {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function attachAudioListener() {
    window.wallpaperRegisterAudioListener(processAudio)
}

function attachPropertyListener() {
    window.wallpaperPropertyListener = {
        applyUserProperties: applyProperties
    }
}

function queueFrame() {
    window.requestAnimationFrame(onFrame)
}

const frameDeltaTime = new Timer()
let accumulatedFrames = 0
function onFrame() {
    queueFrame()

    if (settings.fpsLimit > 0) {
        accumulatedFrames += frameDeltaTime.mark()
        const targetDeltaTime = 1.0 / settings.fpsLimit
        
        if (accumulatedFrames < targetDeltaTime) {
            return
        } else {
            accumulatedFrames -= targetDeltaTime
        }
    }

    draw()
}