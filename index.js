const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Songs
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display 
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //Get the length of the outline
    const outlineLenght = outline.getTotalLength();
    console.log(outlineLenght);

    // Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLenght;
    outline.style.strokeDashoffset = outlineLenght;

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);

        })
    })

    // Play song
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select songs
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
          fakeDuration = this.getAttribute('data-time');
          timeDisplay.textContent = `${Math.floor(fakeDuration / 60)} : ${Math.floor(fakeDuration % 60)}`  
        })
    })

    // Stop and play the sounds
    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src ='./svg/pause.svg';
        }else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //Animate the time circle 
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the progress of circle
        let progress = outlineLenght - (currentTime / fakeDuration) * outlineLenght;
        outline.style.strokeDashoffset = progress;

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();