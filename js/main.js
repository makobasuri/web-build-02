// -------------------------------------------------------------------
//
// Main File - Helpers and Instantiation
//
// -------------------------------------------------------------------

// Helper Function turning querySelectorAll results to real Arrays
function getDomNodeArray(selector) {
	var elementCollection = document.querySelectorAll(selector);
	var elementArray = Array.prototype.slice.apply(elementCollection);
	return elementArray;
};

var testModule = {

	construct: function(domElement) {
		Object.create(this);
		var self = this;

		self.button = domElement.querySelector('button');
		self.text = domElement.querySelector('p');

		self.button.addEventListener('click', toggleVisibility);

		function toggleVisibility() {
			if (self.text.classList.value === 'is-off') {
				self.text.classList.remove('is-off')
			} else {
				self.text.classList.add('is-off')
			}
		}
	}
}

// -------------------------------------------------------------------
// Document ready function
// -------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function(event) {

	// instantiate VideoPlayers
	var videoModulesFound = getDomNodeArray('.module-video');
	videoModulesFound.forEach(function(arrayElement){
		var instancedVid = [];
		instancedVid.push(new VideoPlayer(arrayElement));
	});

	var testModulesFound = getDomNodeArray('.module-test');
	testModulesFound.forEach(function(arrayElement){
		testModule.construct(arrayElement);

	});

/*
	var mobileNavFound = getDomNodeArray('.nav-mobile');
	mobileNavFound.forEach(function(arrayElement) {
		mobileNavInstances.push(
			Object.create(mobileNav, {
				'domElement': {
					value: arrayElement,
					enumerable: true
				}
			})
		)
	});

	if (mobileNavInstances.length > 0)	{
		mobileNavInstances.forEach(function(item) {
			item.construct();
		});
	}
*/

});
