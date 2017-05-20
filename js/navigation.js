'use strict';

// var mobileNavRoot = document.querySelector('.nav-mobile');
// var navSwitchButton = mobileNavRoot.querySelector('.mobile-nav-switch');
// var navigationOffCanvas = mobileNavRoot.querySelector('.nav--off-canvas');

// var switchNavigation = function() {
// 	console.log('hallo 2');
// }

// navSwitchButton.addEventListener('click', switchNavigation);

var mobileNav = {

	construct: function(domElement) {
		var self = Object.create(this);
		self.rootNode = this.domElement;
		self.switchNode = self.rootNode.querySelector('.mobile-nav-switch');
		self.navItems = self.rootNode.querySelector('.nav--off-canvas');

		// switchNode is the selector AND null
		self.switchNode.addEventListener('click', toggleMenu, false);
	},

	toggleMenu: function() {
		if (self.navItems.classList('is-off')) {
			self.navItems.classList.remove('is-off');
		} else {
			self.navItems.classList.add('is-off');
		}
	},
};
