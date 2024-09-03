function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const graphicsDeltaTime = new Timer()

function draw() {
    clear()

    const deltaTime = graphicsDeltaTime.mark()

    drawSpectrogram(deltaTime)
    drawMedia(deltaTime)

    if (settings.debugEnabled) {
        drawDebug(deltaTime)
    }
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
}