function getSpectrogramLeft() {
    return settings.spectrogramSpacingFromEdge
}

function getSpectrogramRight() {
    return canvas.width - settings.spectrogramSpacingFromEdge
}

function getSpectrogramTop() {
    return getSpectrogramBottom() - settings.spectrogramHeight
}

function getSpectrogramBottom() {
    return canvas.height - settings.spectrogramSpacingFromBottom
}

function getSpectrogramRect() {
    const rectWidth = getSpectrogramRight() - getSpectrogramLeft()
    const rectHeight = getSpectrogramBottom() - getSpectrogramTop()
    return [
        getSpectrogramLeft(), getSpectrogramTop(), rectWidth, rectHeight
    ]
}

function drawSpectrogram(deltaTime) {
    if (settings.spectrogramDropShadowEnabled) {
        drawSpectrogramDropShadow()
    }
    drawSpectrogramCurve(deltaTime)
}

function getTargetScalar() {
    if (targetAverageVolume > EPSILON) {
        return 1.0 / targetAverageVolume
    } else {
        return 0
    }
}

const currentAudio = []
let currentScalar = 1

function drawSpectrogramDropShadow() {
    const intColor = settings.spectrogramDropShadowColorRaw.split(' ').map(c => Math.ceil(c * 255));
    const COLOR = `rgb(${intColor},${settings.spectrogramDropShadowAmount})`

    function positionToHeight(y) {
        return y / canvas.height
    }

    const gradientBottom = context.createLinearGradient(0, 0, 0, canvas.height)
    gradientBottom.addColorStop(positionToHeight(getSpectrogramTop()), '#0000')
    gradientBottom.addColorStop(1, COLOR)
    context.fillStyle = gradientBottom
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSpectrogramCurve(deltaTime) {
    const points = []

    currentScalar = lerpSmooth(currentScalar, getTargetScalar(), deltaTime, settings.audioNormalizationRate)

    for (let i = 0; i < AUDIO_LENGTH; i++) {
        let volume = currentAudio[i] ?? 0

        if (targetAudio[i] !== undefined) {
            const target = targetAudio[i]
            volume = lerpSmooth(volume, target, deltaTime, settings.smoothingRate)
        }
        currentAudio[i] = volume

        volume *= currentScalar
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
    context.strokeStyle = settings.spectrogramColor
    context.lineWidth = 5
    context.stroke()
}