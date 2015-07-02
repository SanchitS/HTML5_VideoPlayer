window.addEventListener('load', function () {

    //video container
    video = document.getElementById('video');

    //progress bar container
    pbar = document.getElementById('pbar');

    //progress bar container
    pbarContainer = document.getElementById('pbar-container');

    //    button container
    playButton = document.getElementById('play-button');
    timeField = document.getElementById('time-field');

    video.load();

    video.addEventListener('canplay', function () {

        playButton.addEventListener('click', playOrPause, false);
        pbarContainer.addEventListener('click', skip, false);
        updatePlayer();

    }, false);

}, false);

function playOrPause() {
    if (video.paused) {
        video.play();
        playButton.src = 'images/pause.png';
        update = setInterval(updatePlayer, 30);
    } else {
        video.pause();
        playButton.src = 'images/play.png';
        window.clearInterval(update);
    }
}

function updatePlayer() {
    var percentage = (video.currentTime / video.duration) * 100;
    pbar.style.width = percentage + '%';
    timeField.innerHTML = getFormattedTime();
    if (video.ended) {
        window.clearInterval(update);
        playButton.src = 'images/replay.png';
    }
}

function skip(ev) {
    var mouseX = ev.pageX - pbarContainer.offsetLeft;
    var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length - 2));
    video.currentTime = (mouseX / width) * video.duration;
    updatePlayer();
}

function getFormattedTime() {
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds / 60);
    if (minutes > 0) seconds -= 60 * minutes;
    if (seconds.toString().length === 1) seconds = '0' + seconds;
    if (minutes.toString().length === 1) minutes = '0' + minutes;

    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds / 60);
    if (totalMinutes > 0) totalSeconds -= 60 * totalMinutes;
    if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;
    if (totalMinutes.toString().length === 1) totalMinutes = '0' + totalMinutes;
    return minutes + ':' + seconds + '/' + totalMinutes + ':' + totalSeconds;

}