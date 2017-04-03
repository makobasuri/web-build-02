document.addEventListener('DOMContentLoaded', function() {
	function VideoPlayer() {
		var moduleVideo = document.querySelector('.module-video');
		var video = moduleVideo.querySelector('video');
		var videoControls = moduleVideo.querySelector('.video--controls');
		var playPauseButton = videoControls.querySelector('.vc-play');
		var restartButton = videoControls.querySelector('.vc-restart');
		var progressBar = videoControls.querySelector('.vc-progress-bar');
		var progressBarFill = videoControls.querySelector('.vc-progress-bar--fill');
		var soundButton = videoControls.querySelector('.vc-sound');
		var volumeBar = videoControls.querySelector('.vc-volume-bar');
		var volumeBarFill = videoControls.querySelector('.vc-volume-bar--fill');
		var volumeDrag = false;

		this.vidplay = function() {
			if (video.paused) {
				video.play();
				playPauseButton.querySelector('i').classList.remove('mdi-arrow-right-drop-circle');
				playPauseButton.querySelector('i').classList.add('mdi-stop');

				video.addEventListener('ended', function() {
					playPauseButton.querySelector('i').classList.remove('mdi-stop');
					playPauseButton.querySelector('i').classList.add('mdi-arrow-right-drop-circle');
				});
			} else {
				video.pause();
				playPauseButton.querySelector('i').classList.remove('mdi-stop');
				playPauseButton.querySelector('i').classList.add('mdi-arrow-right-drop-circle');
			}
		}

		this.soundOnOff = function() {
			if (video.muted) {
				video.muted = false;
				soundButton.querySelector('i').classList.remove('mdi-volume-off');
				soundButton.querySelector('i').classList.add('mdi-volume-high');
			} else {
				video.muted = true;
				soundButton.querySelector('i').classList.remove('mdi-volume-high');
				soundButton.querySelector('i').classList.add('mdi-volume-off');
			}
		}

		this.restart = function() {
			video.currentTime = 0;
			progressBar.value = 0;
		}

		this.progressBarClick = function(e) {
			var fillRect = progressBar.getBoundingClientRect();
			var progressClicked = e.clientX - fillRect.left;
			var totalProgress = progressBar.clientWidth;
			var calcProgress = Math.floor((100 / totalProgress) * progressClicked);

			video.currentTime = calcProgress * (video.duration / 100);
			updateProgressBar();
		}

		this.updateProgressBar = function() {
			var percentage = Math.floor((100 / video.duration) * video.currentTime);
			progressBarFill.style.width = percentage + '%';
			progressBarFill.innerHTML = percentage + '% played';
		}

		this.updateVolume = function(x, vol) {
			var fillRect = volumeBar.getBoundingClientRect();
			var volumeClicked = x.clientX - fillRect.left;
			console.log(volumeClicked);
			var totalVolume = volumeBar.clientWidth;
			var calcVolume = Math.floor((100 / totalVolume) * volumeClicked);

			video.volume = calcVolume;
			console.log(video.volume);
		}

		volumeBar.addEventListener('mousedown', function(e) {
			volumeDrag = true;
			console.log('Pressing');
			if (video.muted) {
				soundOnOff();
			}
			updateVolume(e);

			volumeBar.addEventListener('mouseup', function(e) {
				if (volumeDrag) {
					volumeDrag = false;
					updateVolume(e);
				}
			});

			volumeBar.addEventListener('mousemove', function(e) {
				if (volumeDrag) {
					updateVolume(e.clientX);
				}
			});
		});

		playPauseButton.addEventListener('click', this.vidplay, false);
		restartButton.addEventListener('click', this.restart, false);
		soundButton.addEventListener('click', soundOnOff, false);
		video.addEventListener('timeupdate', updateProgressBar, false);
		progressBar.addEventListener('click', this.progressBarClick, false);
	}

	VideoPlayer();
});
