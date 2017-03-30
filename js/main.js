document.addEventListener('DOMContentLoaded', function() {
	function VideoPlayer() {
		var video = document.getElementById('video-id');
		var playPauseButton = document.getElementById('play');
		var restartButton = document.getElementById('restart');
		var forwardButton = document.getElementById('fastFwd');
		var rewindButton = document.getElementById('rew');

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
		}

		this.skip = function(value) {
			video.currentTime += value;
			console.log(value);
		}

		playPauseButton.addEventListener('click', this.vidplay, false);
		restartButton.addEventListener('click', this.restart, false);
		rewindButton.addEventListener('click', this.skip(-2), false);
		forwardButton.addEventListener('click', this.skip(2), false);
	}

	VideoPlayer();
});
