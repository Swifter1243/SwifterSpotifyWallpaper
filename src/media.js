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

function drawMedia() {
    const thumbnailTotalSize = settings.thumbnailSize + settings.thumbnailBorderWidth * 2
    const left = settings.thumbnailLeftMargin + thumbnailTotalSize + settings.mediaTextLeftMargin
    const middle = settings.thumbnailTopMargin + thumbnailTotalSize * 0.5 + settings.mediaTextDividerOffset
    const right = canvas.width - settings.mediaTextRightMargin

    // Border
    const borderRect = [
        settings.thumbnailLeftMargin,
        settings.thumbnailTopMargin,
        thumbnailTotalSize,
        thumbnailTotalSize
    ]

    context.beginPath()
    context.rect(...borderRect)
    const gradient = context.createLinearGradient(...borderRect)
    gradient.addColorStop(0, media.secondaryColor)
    gradient.addColorStop(1, media.primaryColor)
    context.fillStyle = gradient
    context.fill()

    // Title
    context.fillStyle = settings.mediaTextColor
    context.textAlign = 'left'
    context.font = `${settings.mediaTextTitleSize}px Minecraft`
    context.textBaseline = 'alphabetic'
    context.fillText(media.title, left, middle - settings.mediaTextDividerMargin)

    // Artist
    context.font = `${settings.mediaTextArtistSize}px Minecraft`
    context.textBaseline = 'top'
    context.fillText(media.artist, left, middle + settings.mediaTextDividerMargin - 2)

    // Progress Text
    context.fillStyle = settings.mediaTextColor
    context.font = `${settings.mediaTextProgressSize}px Minecraft`
    context.textBaseline = 'top'
    context.textAlign = 'right'
    const progressText = `${formatTimestamp(getInterpolatedPosition())} / ${formatTimestamp(media.duration)}`
    context.fillText(progressText, right, middle + + settings.mediaTextDividerMargin)

    // Separator
    const progressColor = isPrimaryColorBright() ? '#FFF' : media.primaryColor
    const separatorColor = '#0006'

    context.beginPath()
    context.moveTo(left, middle)
    context.lineTo(right, middle)
    context.strokeStyle = separatorColor
    context.lineWidth = settings.mediaTextDividerWidth
    context.stroke()

    // Progress Bar
    const progressAmount = getInterpolatedPosition() / media.duration
    const progressEnd = lerp(left, right, progressAmount)

    context.beginPath()
    context.moveTo(left, middle)
    context.lineTo(progressEnd, middle)
    context.strokeStyle = progressColor
    context.lineWidth = settings.mediaTextDividerWidth + 2
    context.stroke()

    const notchWidth = 5
    const notchHeight = settings.mediaTextDividerWidth + 6
    context.fillStyle = '#FFF'
    context.fillRect(
        progressEnd - notchWidth * 0.5,
        middle - notchHeight * 0.5,
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