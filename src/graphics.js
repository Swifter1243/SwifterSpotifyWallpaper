function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const AUDIO_LENGTH = 64

const audioHorizontalMargin = 40
const audioHeight = 1000

function drawAudio(audioArray) {
    clear()

    const points = []

    const leftPositionX = audioHorizontalMargin
    const rightPositionX = canvas.width - audioHorizontalMargin

    for (let i = 0; i < AUDIO_LENGTH; i++) {
        const left = audioArray[i]
        const right = audioArray[i + 64]
        const volume = (left + right) / 2

        const fraction = i / (AUDIO_LENGTH - 1)
        const x = lerp(leftPositionX, rightPositionX, fraction)
        const y = lerp(canvas.height, canvas.height - audioHeight, volume)

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
    context.moveTo(audioHorizontalMargin, canvas.height)

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
    context.quadraticCurveTo(lastPoint.x, lastPoint.y, canvas.width - audioHorizontalMargin, canvas.height);

    context.closePath();
    context.fillStyle = "#FFF";
    context.fill();

    context.strokeStyle = "#FFF"
    context.stroke();
}