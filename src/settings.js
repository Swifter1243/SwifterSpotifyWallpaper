const settings = {
    audioNormalizationRate: 0.3,
    spectrogramSpacingFromEdge: 30,
    spectrogramBottomPosition: 1200,
    spectrogramHeight: 1000,
    smoothingRate: 30,
    thumbnailSize: 0.2,
    fpsLimit: 60,
    debugEnabled: true
}

function applyProperties(properties) {
    if (properties.spectrogramheight) {
        settings.spectrogramHeight = properties.spectrogramheight.value * canvas.height
    }
    if (properties.spectrogramspacingfromedge) {
        settings.spectrogramSpacingFromEdge = properties.spectrogramspacingfromedge.value * canvas.width * 0.5
    }
    if (properties.spectrogrambottomposition) {
        settings.spectrogramBottomPosition = properties.spectrogrambottomposition.value * canvas.height
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
    if (properties.debugenabled) {
        settings.debugEnabled = properties.debugenabled.value
    }
}