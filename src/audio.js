const targetAudio = []
let targetAverageVolume = 1

const AUDIO_LENGTH = 64

function processAudio(audioArray) {
    targetAverageVolume = 0

    for (let i = 0; i < AUDIO_LENGTH; i++) {
        const left = audioArray[i]
        const right = audioArray[i + 64]
        const volume = (left + right) / 2.0
        targetAudio[i] = volume

        targetAverageVolume = Math.max(targetAverageVolume, volume)
    }
}