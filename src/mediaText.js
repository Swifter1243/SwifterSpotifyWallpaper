function drawMediaText() {
    const left = settings.thumbnailLeftMargin + settings.thumbnailSize + settings.mediaTextLeftMargin
    const middle = settings.thumbnailTopMargin + settings.thumbnailSize * 0.5 + settings.mediaTextDividerOffset

    context.font = `${settings.mediaTextTitleSize}px Minecraft`
    context.textBaseline = 'alphabetic'
    context.fillText(media.title, left, middle - settings.mediaTextDividerMargin)

    context.font = `${settings.mediaTextArtistSize}px Minecraft`
    context.textBaseline = 'top'
    context.fillText(media.artist, left, middle + settings.mediaTextDividerMargin - 2)

    context.beginPath()
    context.moveTo(left, middle)
    context.lineTo(canvas.width, middle)
    context.lineWidth = settings.mediaTextDividerWidth
    context.stroke()
}