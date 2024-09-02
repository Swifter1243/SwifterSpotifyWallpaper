let canvas = null
let context = null

setup()

function setup() {
    initializeContext()
    attachAudioListener()
    attachSettings()
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

function attachSettings() {
    window.wallpaperPropertyListener = {
        applyUserProperties: (properties) => {
            if (properties.spectrogramheight) {
                settings.spectrogramHeight = properties.spectrogramheight.value * canvas.height * 20
            }
            if (properties.spectrogramspacingfromedge) {
                settings.spectrogramSpacingFromEdge = properties.spectrogramspacingfromedge.value * canvas.width * 0.5
            }
            if (properties.spectrogrambottomposition) {
                settings.spectrogramBottomPosition = properties.spectrogrambottomposition.value * canvas.height
            }
            if (properties.smoothingrate) {
                settings.smoothingRate = properties.smoothingrate.value
            }
        }
    }
}

function queueFrame() {
    window.requestAnimationFrame(onFrame)
}

function onFrame() {
    queueFrame()
    drawGraphics()
}