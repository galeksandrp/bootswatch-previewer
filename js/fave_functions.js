/*global chrome */

function getFaves(callback){
	chrome.storage.sync.get("favorites", function(data) {
		callback(data.favorites);
	});
}

function setFaves(faves){
	chrome.storage.sync.set({"favorites": faves});
}

function checkFaved(t, callback) {
	getFaves(function(data){
		var faves = data.split(" ");
		if (faves.indexOf(t) > -1) {
			callback(true);
		}
		else {
			callback(false);
		}
	});
}

function addFave(t) {
	getFaves(function(data){
		var s = data+" "+t;
		s = s.trim();
		setFaves(s);
	});
}

function removeFave(t) {
	getFaves(function(data){
		data = data.replace(t + " ", "");
		data = data.replace(t, "");
		setFaves(data.trim());
	});
}

function toggleFave(t) {
	checkFaved(t, function(isFaved) {
		if (isFaved) {
			removeFave(t);
			$("#theme-" + t).hide();
			if ($(".theme-block.theme-faved").length == 0) {
				$("#no-faves").show();
			}
		}
		else {
			addFave(t);
		}
	});
}

function clearFaves(){
	setFaves("");
}