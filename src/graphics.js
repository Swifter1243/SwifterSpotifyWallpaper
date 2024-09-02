function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function getSpectrogramLeft() {
    return settings.spectrogramSpacingFromEdge
}

function getSpectrogramRight() {
    return canvas.width - settings.spectrogramSpacingFromEdge
}

function getSpectrogramTop() {
    return settings.spectrogramBottomPosition - settings.spectrogramHeight
}

function getSpectrogramBottom() {
    return settings.spectrogramBottomPosition
}

const graphicsDeltaTime = new Timer()

function draw() {
    clear()

    const deltaTime = graphicsDeltaTime.mark()

    drawSpectrogram(deltaTime)

    if (settings.debugEnabled) {
        drawDebug(deltaTime)
    }
}

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

function drawSpectrogram(deltaTime) {
    drawSpectrogramCurve(deltaTime)
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

const lastAudio = []
let lastVolume = 1

function drawSpectrogramCurve(deltaTime) {
    const points = []

    const invAverageVolume = 1.0 / currentAverageVolume
    const targetVolume = currentAverageVolume > 0 ? invAverageVolume : 0
    lastVolume = lerpSmooth(lastVolume, targetVolume, deltaTime, settings.audioNormalizationRate)

    for (let i = 0; i < AUDIO_LENGTH; i++) {
        let volume = lastAudio[i] ?? 0

        if (currentAudio[i] !== undefined) {
            const target = currentAudio[i]
            volume = lerpSmooth(volume, target, deltaTime, settings.smoothingRate)
        }
        lastAudio[i] = volume

        volume *= lastVolume
        volume = softClip(volume, 0.2)

        const fraction = i / (AUDIO_LENGTH - 1)
        const x = lerp(getSpectrogramLeft(), getSpectrogramRight(), fraction)
        const y = lerp(getSpectrogramBottom(), getSpectrogramTop(), volume)

        points.push({
            x,
            y
        })
    }

    drawBezierLine(points)
}

function drawBezierLine(points) {
    if (points.length < 2) {
        console.error("At least two points are required to draw a curve.");
        return;
    }

    context.beginPath();
    context.moveTo(getSpectrogramLeft(), getSpectrogramBottom())

    for (let i = 0; i < points.length - 1; i++) {
        const cp1 = points[i];
        const cp2 = points[i + 1];
        const midPoint = {
            x: (cp1.x + cp2.x) / 2,
            y: (cp1.y + cp2.y) / 2
        };

        context.quadraticCurveTo(cp1.x, cp1.y, midPoint.x, midPoint.y);
    }

    const lastPoint = points[points.length - 1];
    context.quadraticCurveTo(lastPoint.x, lastPoint.y, getSpectrogramRight(), getSpectrogramBottom());

    context.closePath();
    context.fillStyle = "#FFF";
    context.fill();

    context.lineWidth = 1
    context.strokeStyle = "#FFF"
    context.stroke();
}