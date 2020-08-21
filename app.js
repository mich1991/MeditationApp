const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('.video-container video')
    const timeSelect = document.querySelectorAll('.time-select button')
    // sounds
    const sounds = document.querySelectorAll('.sound-picker button')

    // time display
    const timeDisplay = document.querySelector('.time-display')

    // get length of the outline
    const outlineLength = outline.getTotalLength()
    console.log(outlineLength)

    // duration
    let initialDuration = 120

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    // change a sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            songCheck(song)
        })
    })

    // play sound
    play.addEventListener('click', () => {
        songCheck(song)
    })

    // time select option

    timeSelect.forEach(select => {
        select.addEventListener('click', function () {
            initialDuration = this.getAttribute('data-time')
            let seconds = Math.floor(initialDuration % 60)
            let minutes = Math.floor(initialDuration / 60)

            timeDisplay.textContent = `${minutes}:00`
        })
    })

    const songCheck = song => {
        if (song.paused) {
            song.play()
            video.play()
            play.src = './svg/pause.svg'
        } else {
            song.pause()
            video.pause()
            play.src = './svg/play.svg'
        }
    }

    // circle animation
    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsedTime = initialDuration - currentTime
        let seconds = Math.floor(elapsedTime % 60)
        let minutes = Math.floor(elapsedTime / 60)

        let progress = outlineLength - (currentTime / initialDuration) * outlineLength
        outline.style.strokeDashoffset = progress

        // animate countdown
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

        if (currentTime >= initialDuration) {
            song.pause()
            song.currentTime = 0
            play.src = './svg/play.svg'
            video.pause()
        }
    }
}

app()