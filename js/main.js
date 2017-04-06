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
});
