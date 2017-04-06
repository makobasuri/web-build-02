'use strict';

var VideoPlayer = function(element) {
	this.video				= element.querySelector('video');
	this.videoControls		= element.querySelector('.video--controls');
	this.playPauseButton	= this.videoControls.querySelector('.vc-play');
	this.progressBar		= this.videoControls.querySelector('.vc-progress-bar');
	this.progressBarFill	= this.progressBar.firstElementChild;
	this.soundButton		= this.videoControls.querySelector('.vc-sound');
	this.volumeBar			= this.videoControls.querySelector('.vc-volume-bar');
	this.volumeBarFill		= this.volumeBar.firstElementChild;
	this.volumeDrag			= false;

	this.vidplay = function() {
		if (this.video.paused) {
			this.video.play();
			this.playPauseButton.firstElementChild.classList.remove('mdi-arrow-right-drop-circle');
			this.playPauseButton.firstElementChild.classList.add('mdi-stop');

		} else {
			this.video.pause();
			this.playPauseButton.firstElementChild.classList.remove('mdi-stop');
			this.playPauseButton.firstElementChild.classList.add('mdi-arrow-right-drop-circle');
		}
	}.bind(this)

	this.toggleWhenEnded = function() {
		this.playPauseButton.firstElementChild.classList.remove('mdi-stop');
		this.playPauseButton.firstElementChild.classList.add('mdi-arrow-right-drop-circle');
	}.bind(this);

	this.soundOnOff = function() {
		if (this.video.muted) {
			this.video.muted = false;
			this.soundButton.firstElementChild.classList.remove('mdi-volume-off');
			this.soundButton.firstElementChild.classList.add('mdi-volume-high');
		} else {
			this.video.muted = true;
			this.soundButton.firstElementChild.classList.remove('mdi-volume-high');
			this.soundButton.firstElementChild.classList.add('mdi-volume-off');
		}
	}.bind(this);

	this.progressBarClick = function(e) {
		var fillRect = this.progressBar.getBoundingClientRect();
		var progressClicked = e.clientX - fillRect.left;
		var totalProgress = this.progressBar.clientWidth;
		var calcProgress = Math.floor((100 / totalProgress) * progressClicked);

		this.video.currentTime = calcProgress * (video.duration / 100);
		this.updateProgressBar();
	}.bind(this);

	this.updateProgressBar = function() {
		var percentage = Math.floor((100 / this.video.duration) * this.video.currentTime);
		this.progressBarFill.style.width = percentage + '%';
		this.progressBarFill.innerHTML = percentage + '% played';
	}.bind(this);

	this.video.addEventListener('ended', this.toggleWhenEnded, false);
	this.playPauseButton.addEventListener('click', this.vidplay, false);
	this.soundButton.addEventListener('click', this.soundOnOff, false);
	this.video.addEventListener('timeupdate', this.updateProgressBar, false);
	this.progressBar.addEventListener('click', this.progressBarClick, false);
}

	// updateVolume: function(x, vol) {
	// 	var fillRect = volumeBar.getBoundingClientRect();
	// 	var volumeClicked = x.clientX - fillRect.left;
	// 	console.log(volumeClicked);
	// 	var totalVolume = volumeBar.clientWidth;
	// 	var calcVolume = Math.floor((100 / totalVolume) * volumeClicked);

	// 	video.volume = calcVolume;
	// 	console.log(video.volume);
	// },

	// bindEvents: function() {
	// 	volumeBar.addEventListener('mousedown', function(e) {
	// 		volumeDrag = true;
	// 		console.log('Pressing');
	// 		if (video.muted) {
	// 			this.soundOnOff();
	// 		}
	// 		updateVolume(e);

	// 		volumeBar.addEventListener('mouseup', function(e) {
	// 			if (volumeDrag) {
	// 				volumeDrag = false;
	// 				updateVolume(e);
	// 			}
	// 		});

	// 		volumeBar.addEventListener('mousemove', function(e) {
	// 			if (volumeDrag) {
	// 				updateVolume(e.clientX);
	// 			}
	// 		});
	// 	});
	//}

