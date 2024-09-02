function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const AUDIO_LENGTH = 64

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

let lastTime = undefined
function getDeltaTime() {
    const currentTime = Date.now()

    if (lastTime === undefined) {
        lastTime = currentTime
        return 0
    }
        
    const difference = currentTime - lastTime
    lastTime = currentTime
    return difference / 1000
}

const lastAudio = []
function drawAudio(audioArray) {
    clear()

    const points = []

    const leftPositionX = getSpectrogramLeft()
    const rightPositionX = getSpectrogramRight()

    const deltaTime = getDeltaTime()
    context.font = "48px Minecraft"
    context.fillText(`Delta Time: ${deltaTime}`, 300, 300)

    for (let i = 0; i < AUDIO_LENGTH; i++) {
        const left = audioArray[i]
        const right = audioArray[i + 64]
        let volume = (left + right) / 2

        if (lastAudio[i] !== undefined) {
            const lastVolume = lastAudio[i]
            volume = lerpSmooth(volume, lastVolume, deltaTime, settings.smoothingRate)
        }
        lastAudio[i] = volume

        const fraction = i / (AUDIO_LENGTH - 1)
        const x = lerp(leftPositionX, rightPositionX, fraction)
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

    context.strokeStyle = "#FFF"
    context.stroke();
}