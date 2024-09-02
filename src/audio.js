const currentAudio = []

const AUDIO_LENGTH = 64

function processAudio(audioArray) {
    for (let i = 0; i < AUDIO_LENGTH; i++) {
        const left = audioArray[i]
        const right = audioArray[i + 64]
        const volume = (left + right) / 2
        currentAudio[i] = volume
    }
}