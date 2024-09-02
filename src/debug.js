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
    currentDebugTextPos = canvas.height * 0.5
    context.font = `${DEBUG_SPACING}px Arial`
}

function addDebugText(text) {
    currentDebugTextPos += DEBUG_SPACING
    context.fillText(text, 10, currentDebugTextPos)
}

function drawSpectrogramBackgroundDebug() {
    context.beginPath()
    context.rect(...getSpectrogramRect())
    context.fillStyle = "#0003"
    context.fill()
}

function drawSpectrogramVolumeDebug() {
    const targetY = lerp(getSpectrogramBottom(), getSpectrogramTop(), 1 / getTargetScalar())
    const currentY = lerp(getSpectrogramBottom(), getSpectrogramTop(), 1 / currentScalar)

    context.lineWidth = 3

    context.beginPath()
    context.moveTo(getSpectrogramLeft(), targetY)
    context.lineTo(getSpectrogramRight(), targetY)
    context.strokeStyle = "#0F0F"
    context.stroke()

    context.beginPath()
    context.moveTo(getSpectrogramLeft(), currentY)
    context.lineTo(getSpectrogramRight(), currentY)
    context.strokeStyle = "#F00F"
    context.stroke()
}