var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var controlBlock = document.getElementById("float-button");

Object.prototype.init = function (obj) {
	controlBlock = document.getElementById("float-button");
	if (typeof(obj) == "object") {
		if (typeof(obj["x"]) != "undefined" && typeof(obj["y"]) != "undefined") {
			console.log("0");
			controlBlock.setAttribute("style", "left: " + obj["x"] + "px;" + "top: " + obj["y"] + "px");
		}
		else if (typeof(obj["LeftUp"]) != "undefined" && obj["LeftUp"] == true) {
			console.log("1");
			controlBlock.setAttribute("style", "left: 0" + "px;" + "top: 0" + "px");
		}
		else if (typeof(obj["LeftDown"]) != "undefined" && obj["LeftDown"] == true) {
			console.log("2");
			controlBlock.setAttribute("style", "left: 0" + "px;" + "top: " + (screenHeight - 90) + "px");
		}
		else if (typeof(obj["RightUp"]) != "undefined" && obj["RightUp"] == true) {
			console.log("3");
			controlBlock.setAttribute("style", "left: " + (screenWidth - 90) + "px;" + "top: 0" + "px");
		}
		else if (typeof(obj["RightDown"]) != "undefined" && obj["RightDown"] == true) {
			console.log("4");
			controlBlock.setAttribute("style", "left: " + (screenWidth - 90) + "px;" + "top: " + (screenHeight - 90) + "px");
		}
	}
}
var BackToTop = new Object;

function backToTop() {
	window.scrollBy(0, -9);
	var pauseTime = setTimeout("backToTop()", 1);
	if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
		clearTimeout(pauseTime);
		controlBlock.style.display = "none";
	}
}

document.onkeydown = function (event) {
	var e = event || window.event;
	if (e && e.keyCode == 48) {
		backToTop();
	}
	//console.log(key);
}

document.onscroll = function (event) {
	if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
		controlBlock.style.display = "none";
	}
	else {
		controlBlock.style.display = "";
	}
}

window.onload = function() {
	controlBlock = document.getElementById("float-button");
	if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
		controlBlock.style.display = "none";
	}
	else {
		controlBlock.style.display = "";
	}
}