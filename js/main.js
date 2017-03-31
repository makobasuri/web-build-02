document.addEventListener('DOMContentLoaded', function() {
	function VideoPlayer() {
		var video = document.getElementById('video-id');
		var playPauseButton = document.getElementById('play');
		var restartButton = document.getElementById('restart');
		var progressBar = document.getElementById('progress-bar');
		var progressBarFill = document.getElementById('progress-bar--fill');

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

		playPauseButton.addEventListener('click', this.vidplay, false);
		restartButton.addEventListener('click', this.restart, false);
		video.addEventListener('timeupdate', updateProgressBar, false);
		progressBar.addEventListener('click', this.progressBarClick, false);
	}

	VideoPlayer();
});
