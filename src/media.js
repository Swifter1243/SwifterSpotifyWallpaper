let mediaThumbnail = null

let positionLastUpdated = performance.now()
let lastInterpolatedPosition = 0

let playbackLastChanged = performance.now()

const HIDE_ANIMATION_LENGTH = 1
const SHOW_ANIMATION_LENGTH = 2

const END_SONG_PROXIMITY_START = 3
const END_SONG_PROXIMITY_OFFSET = 1

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

function isMediaPlaying() {
    return media.state === window.wallpaperMediaIntegration.PLAYBACK_PLAYING
}

function getInterpolatedPosition() {
    if (isMediaPlaying()) {
        const differenceMs = performance.now() - positionLastUpdated
        const position = media.position + differenceMs / 1000
        lastInterpolatedPosition = Math.min(position, media.duration)
    }

    return lastInterpolatedPosition
}

function getHideAnimationPosition() {
    const pauseHidePosition = getPauseHidePosition()
    const songEdgeProximity = getSongEdgeProximity()
    const position = pauseHidePosition * songEdgeProximity
    return easeOutExpo(position)
}

function getSongEdgeProximity() {
    const interpolatedPosition = getInterpolatedPosition()

    if (interpolatedPosition < HIDE_ANIMATION_LENGTH) {
        return interpolatedPosition / HIDE_ANIMATION_LENGTH
    } 

    if (interpolatedPosition > media.duration - END_SONG_PROXIMITY_START - END_SONG_PROXIMITY_OFFSET) {
        const distanceToEnd = (media.duration - interpolatedPosition - END_SONG_PROXIMITY_OFFSET) / END_SONG_PROXIMITY_START
        return clamp01(distanceToEnd)
    }

    return 1
}

function getPauseHidePosition() {
    const differenceMs = performance.now() - playbackLastChanged
    const differenceSec = differenceMs / 1000

    if (isMediaPlaying()) { // show
        const animation = clamp01(differenceSec / SHOW_ANIMATION_LENGTH)
        return animation
    } else { // hide
        const animation = clamp01(differenceSec / HIDE_ANIMATION_LENGTH)
        return Math.pow(1 - animation, 8)
    }
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

    let y = getMediaTextMiddle() - settings.mediaTextDividerMargin
    y += (1 - getHideAnimationPosition()) * settings.mediaTextTitleSize * 1.5

    context.save()
    context.beginPath();
    context.rect(0, 0, canvas.width, getMediaTextMiddle())
    context.clip()

    context.fillText(media.title, getMediaTextLeft(), y)
    context.restore()
}

function drawMediaTextArtist() {
    context.font = `${settings.mediaTextArtistSize}px Minecraft`
    context.textBaseline = 'top'

    let y = getMediaTextMiddle() + settings.mediaTextDividerMargin - 2
    y -= (1 - getHideAnimationPosition()) * settings.mediaTextTitleSize * 2

    context.save()
    context.beginPath();
    context.rect(0, getMediaTextMiddle(), canvas.width, canvas.height - getMediaTextMiddle())
    context.clip()

    context.fillText(media.artist, getMediaTextLeft(), y)
    context.restore()
}

function drawMediaProgressText() {
    context.fillStyle = settings.mediaTextColor
    context.font = `${settings.mediaTextProgressSize}px Minecraft`
    context.textBaseline = 'top'
    context.textAlign = 'right'

    const progressText = `${formatTimestamp(getInterpolatedPosition())} / ${formatTimestamp(media.duration)}`

    let x = getMediaTextRight()
    x += settings.mediaTextProgressSize * 50 * (1 - getHideAnimationPosition())

    context.fillText(progressText, x, getMediaTextMiddle() + settings.mediaTextDividerMargin)
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
    let progressAmount = getInterpolatedPosition() / media.duration
    progressAmount *= getHideAnimationPosition()
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
        progressEnd - notchWidth * 0.5 * getHideAnimationPosition(),
        getMediaTextMiddle() - notchHeight * 0.5,
        notchWidth * getHideAnimationPosition(),
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
    playbackLastChanged = performance.now()
    media.state = event.state
}

function processMediaTimelineListener(event) {
    positionLastUpdated = performance.now()
    media.position = event.position
    media.duration = event.duration
}