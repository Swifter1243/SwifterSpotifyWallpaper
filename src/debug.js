function drawDebug(deltaTime) {
    startDebugText()
    addDebugText(`Delta Time: ${deltaTime}`)
    addDebugText(`Approx FPS: ${1.0/deltaTime}`)

    drawSpectrogramBackgroundDebug()
    drawSpectrogramVolumeDebug()
}

const DEBUG_SPACING = 32
const DEBUG_LABEL_SIZE = 20
let currentDebugTextPos = 0

function startDebugText() {
    currentDebugTextPos = canvas.height * 0.5
    context.font = `${DEBUG_SPACING}px Arial`
    context.textBaseline = 'bottom'
    context.textAlign = 'left'
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

    context.beginPath()
    context.moveTo(getSpectrogramLeft(), getSpectrogramTop())
    context.lineTo(getSpectrogramRight(), getSpectrogramTop())
    context.strokeStyle = "#00FF"
    context.stroke()

    context.font = `${DEBUG_LABEL_SIZE}px Arial`
    context.fillStyle = '#FFF'
    context.textBaseline = 'bottom'
    context.fillText('Target Scalar', getSpectrogramLeft(), targetY - 6)
    context.fillText('Smoothed Scalar', getSpectrogramLeft(), currentY - 6)
    context.fillText('Baseline Scalar', getSpectrogramLeft(), getSpectrogramTop())
}