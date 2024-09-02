function drawDebug(deltaTime) {
    startDebugText()
    addDebugText(`Delta Time: ${deltaTime}`)
    addDebugText(`Approx FPS: ${1.0/deltaTime}`)

    drawSpectrogramBackgroundDebug()
    drawSpectrogramVolumeDebug()
}

const DEBUG_SPACING = 32
let currentDebugTextPos = 0

function startDebugText() {
    currentDebugTextPos = 0
    context.font = `${DEBUG_SPACING}px Arial`
}

function addDebugText(text) {
    currentDebugTextPos += DEBUG_SPACING
    context.fillText(text, 10, currentDebugTextPos)
}

function drawSpectrogramBackgroundDebug() {
    const rectWidth = getSpectrogramRight() - getSpectrogramLeft()
    const rectHeight = getSpectrogramBottom() - getSpectrogramTop()
    context.beginPath()
    context.rect(getSpectrogramLeft(), getSpectrogramTop(), rectWidth, rectHeight)
    context.fillStyle = "#0003"
    context.fill()
}

function drawSpectrogramVolumeDebug() {
    const currentY = lerp(getSpectrogramBottom(), getSpectrogramTop(), currentAverageVolume)
    const lastY = lerp(getSpectrogramBottom(), getSpectrogramTop(), 1 / lastVolume)

    context.lineWidth = 3

    context.beginPath()
    context.moveTo(getSpectrogramLeft(), currentY)
    context.lineTo(getSpectrogramRight(), currentY)
    context.strokeStyle = "#0F0F"
    context.stroke()

    context.beginPath()
    context.moveTo(getSpectrogramLeft(), lastY)
    context.lineTo(getSpectrogramRight(), lastY)
    context.strokeStyle = "#F00F"
    context.stroke()
}