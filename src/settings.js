const settings = {
    // Spectrogram
    spectrogramColor: '#FFF',
    spectrogramSpacingFromEdge: 50,
    spectrogramSpacingFromBottom: 50,
    spectrogramHeight: 300,
    smoothingRate: 30,
    audioNormalizationRate: 0.3,

    // Thumbnail
    thumbnailSize: 250,
    thumbnailLeftMargin: 20,
    thumbnailTopMargin: 20,
    thumbnailBorderWidth: 5,

    // Media Text
    mediaTextColor: '#FFF',
    mediaTextLeftMargin: 20,
    mediaTextTitleSize: 48,
    mediaTextArtistSize: 30,
    mediaTextDividerWidth: 3,
    mediaTextDividerMargin: 10,
    mediaTextDividerOffset: 0,

    // Display
    fpsLimit: 60,
    debugEnabled: false
}

function applyProperties(properties) {
    applySpectrogramProperties(properties)
    applyThumbnailProperties(properties)
    applyMediaTextProperties(properties)
    applyBackgroundProperties(properties)
    applyDisplayProperties(properties)
}

function applySpectrogramProperties(properties) {
    if (properties.spectrogramcolor) {
        settings.spectrogramColor = colorToCSS(properties.spectrogramcolor.value)
    }
    if (properties.spectrogramheight) {
        settings.spectrogramHeight = properties.spectrogramheight.value
    }
    if (properties.spectrogramspacingfromedge) {
        settings.spectrogramSpacingFromEdge = properties.spectrogramspacingfromedge.value
    }
    if (properties.spectrogramspacingfrombottom) {
        settings.spectrogramSpacingFromBottom = properties.spectrogramspacingfrombottom.value
    }
}

function applyThumbnailProperties(properties) {
    if (properties.thumbnailsize) {
        settings.thumbnailSize = properties.thumbnailsize.value
        updateThumbnailSize()
    }
    if (properties.thumbnailleftmargin) {
        settings.thumbnailLeftMargin = properties.thumbnailleftmargin.value
        updateThumbnailPosition()
    }
    if (properties.thumbnailtopmargin) {
        settings.thumbnailTopMargin = properties.thumbnailtopmargin.value
        updateThumbnailPosition()
    }
    if (properties.thumbnailborderwidth) {
        settings.thumbnailBorderWidth = properties.thumbnailborderwidth.value
        updateThumbnailPosition()
    }
}

function applyMediaTextProperties(properties) {
    if (properties.mediatextcolor) {
        settings.mediaTextColor = colorToCSS(properties.mediatextcolor.value)
    }
    if (properties.mediatextleftmargin) {
        settings.mediaTextLeftMargin = properties.mediatextleftmargin.value
    }
    if (properties.mediatexttitlesize) {
        settings.mediaTextTitleSize = properties.mediatexttitlesize.value
    }
    if (properties.mediatextartistsize) {
        settings.mediaTextArtistSize = properties.mediatextartistsize.value
    }
    if (properties.mediatextdividerwidth) {
        settings.mediaTextDividerWidth = properties.mediatextdividerwidth.value
    }
    if (properties.mediatextdividermargin) {
        settings.mediaTextDividerMargin = properties.mediatextdividermargin.value
    }
    if (properties.mediatextdivideroffset) {
        settings.mediaTextDividerOffset = properties.mediatextdivideroffset.value
    }
}

function applyBackgroundProperties(properties) {
    if (properties.backgroundimage) {
        const imagePath = 'file:///' + properties.backgroundimage.value;
        background.src = imagePath
    }
}

function applyDisplayProperties(properties) {
    if (properties.smoothingrate) {
        settings.smoothingRate = properties.smoothingrate.value
    }
    if (properties.fpslimit) {
        settings.fpsLimit = properties.fpslimit.value
    }
    if (properties.audionormalizationrate) {
        settings.audioNormalizationRate = properties.audionormalizationrate.value
    }
    if (properties.debugenabled) {
        settings.debugEnabled = properties.debugenabled.value
    }
}