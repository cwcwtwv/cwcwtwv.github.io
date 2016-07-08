var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var messages = new Array();
var msgNum = 5;
var shift = 0;
var timeInt = 0;
var onloadFlag = 0;
var adminFlag = 0;
var adminShift = 0;
var basicHeight = 16;
var deltaHeight = 15;

init();

function init() {
	for (var i = 0; i < msgNum; i++) {
		document.getElementById("img"+i).src = "../../image/loading.gif";
	}
	document.getElementById("imga").src = "../../image/loading.gif";
}

var xhr = new XMLHttpRequest();
function createXHR() {
	if (typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	} 
	else {
		throw new Error("No XHR object available.");
	}
}
xhr.onreadystatechange = function(event) {
	if (xhr.readyState == 4) {
		if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			console.log(xhr.responseText);
			console.log("0..0");
			if (onloadFlag == 0) {
				onloadFlag = 1;
			}
			else {
				return;
			}
			messages = eval(xhr.responseText);
			document.getElementById("fa").style.display = "none";
			for (var i = 0; i < msgNum; i++) {
				document.getElementsByClassName("msg"+i)[0].innerHTML = messages[msgNum-1-i].content;
				document.getElementsByClassName("msg"+i)[1].innerHTML = messages[msgNum-1-i].content;
				document.getElementById("img"+i).src = messages[msgNum-1-i].headimgurl;
				document.getElementById("name"+i).innerHTML = messages[msgNum-1-i].nickname;
				update();
			}
		} 
		else {
			console.log("Request was unsuccessful: " + xhr.status);
		}
	}
};
xhr.open("GET", "https://wall.cgcgbcbc.com/api/messages?num="+msgNum, true);
xhr.send(null);


var socket = io("https://wall.cgcgbcbc.com");
socket.on("connect", function() {
	console.log("0.0");
});
socket.on("event", function(data) {
	console.log(data);
});
socket.on("disconnect", function() {
	console.log("=.=");
});
socket.on("new message", function(obj) {
	console.log(obj);
	for (var i = 0; i < (msgNum - 1); i++) {
		document.getElementsByClassName("msg"+i)[0].innerHTML = document.getElementsByClassName("msg"+(i+1))[0].innerHTML;
		document.getElementsByClassName("msg"+i)[1].innerHTML = document.getElementsByClassName("msg"+(i+1))[1].innerHTML;
		document.getElementById("img"+i).src = document.getElementById("img"+(i+1)).src;
		document.getElementById("name"+i).innerHTML = document.getElementById("name"+(i+1)).innerHTML;
	}
	document.getElementsByClassName("msg"+(msgNum-1))[0].innerHTML = obj.content;
	document.getElementsByClassName("msg"+(msgNum-1))[1].innerHTML = obj.content;
	document.getElementById("img"+(msgNum-1)).src = obj.headimgurl;
	document.getElementById("name"+(msgNum-1)).innerHTML = obj.nickname;
	console.log("A "+shift);
	update();
});
socket.on("admin", function(obj) {
	console.log(obj);
	document.getElementsByClassName("msga")[0].innerHTML = obj.content;
	document.getElementsByClassName("msga")[1].innerHTML = obj.content;
	document.getElementById("imga").src = "../../image/admin.png";
	document.getElementById("namea").innerHTML = obj.nickname;
	showAdmin();
});

function update() {
	for (var i = 0; i < msgNum; i++) {
		if (document.getElementsByClassName("msg"+i)[0].innerHTML.length > 19) {
			document.getElementById("fixed"+i).style.display = "none";
			document.getElementById("float"+i).style.display = "";
		}
		else {
			document.getElementById("fixed"+i).style.display = "";
			document.getElementById("float"+i).style.display = "none";
		}
	}
	for (var i = 0; i < (msgNum - 0); i++) {
		document.getElementById("f"+i).className = "c"+i;
	}
}

function updateAdmin() {
	if (document.getElementsByClassName("msga")[0].innerHTML.length > 19) {
		document.getElementById("fixeda").style.display = "none";
		document.getElementById("floata").style.display = "";
	}
	else {
		document.getElementById("fixeda").style.display = "";
		document.getElementById("floata").style.display = "none";
	}
}

function beginAdmin() {
	document.getElementById("fa").style.display = "";
	document.getElementById("f0").style.display = "none";
}

function showAdmin() {
	clearTimeout(timeInt);
	console.log("B "+shift);
	document.getElementById("fa").style.display = "";
	document.getElementById("f0").style.display = "none";
	updateAdmin();
	adminFlag = 1;
	timeInt = setTimeout("stopAdmin()", 10000);

}

function stopAdmin() {
	console.log("dada "+adminFlag);
	adminFlag = 0;
	console.log("C "+shift);
	document.getElementById("fa").style.display = "none";
	document.getElementById("f0").style.display = "";
	clearTimeout(timeInt);
}

function changeMsg() {
	for (var i = 0; i < msgNum; i++) {
		document.getElementById("f"+i).style.transitionDuration;
	}
}