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

function drawSpectrogram(deltaTime) {
    drawSpectrogramCurve(deltaTime)
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