'use strict';

var mobileNavRoot = document.querySelector('.nav-mobile');
var navSwitchButton = mobileNavRoot.querySelector('.mobile-nav-switch');
var navigationOffCanvas = mobileNavRoot.querySelector('.nav--off-canvas');

var switchNavigation = function() {
	console.log('hallo 2');
}

navSwitchButton.addEventListener('click', switchNavigation);

