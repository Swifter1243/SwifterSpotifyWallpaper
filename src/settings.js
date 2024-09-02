const settings = {
    audioNormalizationRate: 0.3,
    spectrogramSpacingFromEdge: 50,
    spectrogramSpacingFromBottom: 50,
    spectrogramHeight: 300,
    smoothingRate: 30,
    thumbnailSize: 250,
    thumbnailLeftMargin: 20,
    thumbnailTopMargin: 20,
    fpsLimit: 60,
    debugEnabled: true
}

function applyProperties(properties) {
    if (properties.spectrogramheight) {
        settings.spectrogramHeight = properties.spectrogramheight.value
    }
    if (properties.spectrogramspacingfromedge) {
        settings.spectrogramSpacingFromEdge = properties.spectrogramspacingfromedge.value
    }
    if (properties.spectrogramspacingfrombottom) {
        settings.spectrogramSpacingFromBottom = properties.spectrogramspacingfrombottom.value
    }
    if (properties.smoothingrate) {
        settings.smoothingRate = properties.smoothingrate.value
    }
    if (properties.fpslimit) {
        settings.fpsLimit = properties.fpslimit.value
    }
    if (properties.audionormalizationrate) {
        settings.audioNormalizationRate = properties.audionormalizationrate.value
    }
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
    if (properties.debugenabled) {
        settings.debugEnabled = properties.debugenabled.value
    }
}