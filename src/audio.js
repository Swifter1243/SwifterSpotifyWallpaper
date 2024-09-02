const currentAudio = []
let currentAverageVolume = 1

const AUDIO_LENGTH = 64

function processAudio(audioArray) {
    currentAverageVolume = 0

    for (let i = 0; i < AUDIO_LENGTH; i++) {
        const left = audioArray[i]
        const right = audioArray[i + 64]
        const volume = (left + right) / 2
        currentAudio[i] = volume

        currentAverageVolume += volume
    }

    currentAverageVolume /= AUDIO_LENGTH
}