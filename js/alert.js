var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var alertWindow = document.getElementById("float-window");
var draggable = true;
var dragging = false;
var closeKey = 27;
var winX = 0;
var winY = 90;
var x = 0;
var y = 0;
Object.prototype.draggable = true;
Object.prototype.init = function (obj) {
	alertWindow = document.getElementById("float-window");
	if (typeof(obj) == "object") {
		if (typeof(obj["content"]) != "undefined") {
			console.log(alertWindow.value);
			alertWindow.innerHTML = obj["content"];		}
		else if (typeof(obj["draggable"]) != "undefined") {
			console.log("1");
			draggable = obj["draggable"];
		}
		else if (typeof(obj["closeKey"]) != "undefined") {
			console.log("2");
			closeKey = obj["closeKey"];
		}
	}
}

var moveTime = 0;
function moveWindow(event) {
	if (draggable == false) {
		return;
	}
	dragging = true;
	var e = event || window.event;
	console.log(x);
	console.log(y);
	//moveTime = setTimeout("moveWindow()", 1);
	x = e.clientX;
	y = e.clientY;
}

function stopMoving(event) {
	if (draggable == false) {
		return;
	}
	dragging = false;
	//clearTimeout(moveTime);
}

document.onmousemove = function (event) {
	if (dragging == false) {
		return;
	}
	var e = event || window.event;
	alertWindow.style.left =  alertWindow.offsetLeft + (e.clientX - x) + "px";
	alertWindow.style.top = alertWindow.offsetTop + (e.clientY - y) + "px";
	x = e.clientX;
	y = e.clientY;
	
}

document.onkeydown = function (event) {
	var e = event || window.event;
	if (e && e.keyCode == closeKey) {
		console.log("get");
		alertWindow.style.display = "none";
	}
	else if (e){
		console.log("other")
		alertWindow.style.display = "";
	}
	//console.log(key);
}

window.onload = function() {
	alertWindow = document.getElementById("float-window");
	alertWindow.style.display = "none";
	draggable = true;
	closeKey = 27;
	winX = 0;
	winY = 90;
	x = 0;
	y = 0;
}