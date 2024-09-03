let mediaThumbnail = null
let positionLastUpdated = performance.now()
let lastInterpolatedPosition = 0

const media = {
    isEnabled: true,
    title: 'Title',
    artist: 'Artist',
    subTitle: 'Subtitle',
    albumTitle: 'Album Title',
    albumArtist: 'Album Artist',
    genres: 'Genre, Genre',
    contentType: 'music',
    primaryColor: '#FFF',
    secondaryColor: '#FFF',
    tertiaryColor: '#FFF',
    textColor: '#FFF',
    highContrastColor: '#FFF',
    state: window.wallpaperMediaIntegration.PLAYBACK_STOPPED,
    position: 0,
    duration: 1
}

function isPrimaryColorBright() {
    return media.highContrastColor.includes('F')
}

function getInterpolatedPosition() {
    if (media.state === window.wallpaperMediaIntegration.PLAYBACK_PLAYING) {
        const differenceMs = performance.now() - positionLastUpdated
        const position = media.position + differenceMs / 1000
        lastInterpolatedPosition = Math.min(position, media.duration)
    }

    return lastInterpolatedPosition
}

function initializeMediaThumbnail() {
    mediaThumbnail = document.getElementById('mediaThumbnail')
    updateThumbnailSize()
    updateThumbnailPosition()
}

function updateThumbnailSize() {
    mediaThumbnail.width = settings.thumbnailSize
    mediaThumbnail.height = settings.thumbnailSize
}

function updateThumbnailPosition() {
    mediaThumbnail.style.left = `${settings.thumbnailLeftMargin + settings.thumbnailBorderWidth}px`
    mediaThumbnail.style.top = `${settings.thumbnailTopMargin + settings.thumbnailBorderWidth}px`
}

function getThumbnailTotalSize() {
    return settings.thumbnailSize + settings.thumbnailBorderWidth * 2
}

function getMediaTextLeft() {
    return settings.thumbnailLeftMargin + getThumbnailTotalSize() + settings.mediaTextLeftMargin
}

function getMediaTextRight() {
    return canvas.width - settings.mediaTextRightMargin
}

function getMediaTextMiddle() {
    return settings.thumbnailTopMargin + getThumbnailTotalSize() * 0.5 + settings.mediaTextDividerOffset
}

function drawMedia(deltaTime) {
    drawThumbnailBorder()
    drawMediaTextTitle()
    drawMediaTextArtist()
    drawMediaProgressText()
    drawMediaSeparator()
    drawMediaProgressBar()
}

function drawThumbnailBorder() {
    const borderRect = [
        settings.thumbnailLeftMargin,
        settings.thumbnailTopMargin,
        getThumbnailTotalSize(),
        getThumbnailTotalSize()
    ]

    context.beginPath()
    context.rect(...borderRect)
    const gradient = context.createLinearGradient(...borderRect)
    gradient.addColorStop(0, media.secondaryColor)
    gradient.addColorStop(1, media.primaryColor)
    context.fillStyle = gradient
    context.fill()
}

function drawMediaTextTitle() {
    context.fillStyle = settings.mediaTextColor
    context.textAlign = 'left'
    context.font = `${settings.mediaTextTitleSize}px Minecraft`
    context.textBaseline = 'alphabetic'
    context.fillText(media.title, getMediaTextLeft(), getMediaTextMiddle() - settings.mediaTextDividerMargin)
}

function drawMediaTextArtist() {
    context.font = `${settings.mediaTextArtistSize}px Minecraft`
    context.textBaseline = 'top'
    context.fillText(media.artist, getMediaTextLeft(), getMediaTextMiddle() + settings.mediaTextDividerMargin - 2)
}

function drawMediaProgressText() {
    context.fillStyle = settings.mediaTextColor
    context.font = `${settings.mediaTextProgressSize}px Minecraft`
    context.textBaseline = 'top'
    context.textAlign = 'right'
    const progressText = `${formatTimestamp(getInterpolatedPosition())} / ${formatTimestamp(media.duration)}`
    context.fillText(progressText, getMediaTextRight(), getMediaTextMiddle() + settings.mediaTextDividerMargin)
}

function drawMediaSeparator() {
    context.beginPath()
    context.moveTo(getMediaTextLeft(), getMediaTextMiddle())
    context.lineTo(getMediaTextLeft(), getMediaTextMiddle())
    context.strokeStyle = '#0006'
    context.lineWidth = settings.mediaTextDividerWidth
    context.stroke()
}

function drawMediaProgressBar() {
    const progressColor = isPrimaryColorBright() ? '#FFF' : media.primaryColor
    const progressAmount = getInterpolatedPosition() / media.duration
    const progressEnd = lerp(getMediaTextLeft(), getMediaTextRight(), progressAmount)

    context.beginPath()
    context.moveTo(getMediaTextLeft(), getMediaTextMiddle())
    context.lineTo(progressEnd, getMediaTextMiddle())
    context.strokeStyle = progressColor
    context.lineWidth = settings.mediaTextDividerWidth + 2
    context.stroke()

    const notchWidth = 5
    const notchHeight = settings.mediaTextDividerWidth + 6
    context.fillStyle = '#FFF'
    context.fillRect(
        progressEnd - notchWidth * 0.5,
        getMediaTextMiddle() - notchHeight * 0.5,
        notchWidth,
        notchHeight
    )
}

function processMediaStatusListener(event) {
    media.isEnabled = event.enabled
}

function processMediaPropertiesListener(event) {
    media.title = event.title
    media.artist = event.artist
    media.subTitle = event.subTitle
    media.albumTitle = event.albumTitle
    media.albumArtist = event.albumArtist
    media.genres = event.genres
    media.contentType = event.contentType
}

function processMediaThumbnailListener(event) {
    mediaThumbnail.src = event.thumbnail
    media.primaryColor = event.primaryColor
    media.secondaryColor = event.secondaryColor
    media.tertiaryColor = event.tertiaryColor
    media.textColor = event.textColor
    media.highContrastColor = event.highContrastColor
}

function processMediaPlaybackListener(event) {
    media.state = event.state
}

function processMediaTimelineListener(event) {
    positionLastUpdated = performance.now()
    media.position = event.position
    media.duration = event.duration
}