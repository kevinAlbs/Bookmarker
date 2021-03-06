var shadow_root = null, shadow_content = null;
var qCount = 0;
var canSave = false;
var shiftPressed = false;
var OPEN_TOP = 0, CLOSE_TOP = -80;
var data = {
	url : "",
	title : "",
	notes : "",
	ispost: true
};
var keys = {
	EXIT : 27,
	SAVE: 13,
	SHOW: 81
}

function openDrawer(callback){
	qCount = 0;
	canSave = true;
	$(shadow_root).show().animate({
		top: OPEN_TOP
	}, 250, "easeOutQuad", function(){
		if(callback){
			callback.call();
		}
		shadow_content.querySelector("input").focus();
	});
	//update page url
	chrome.runtime.sendMessage({msg: "fetch_url"}, function(response) {
		data.url = response.url;
	});
}

function closeDrawer(callback){
	$(shadow_root).animate({
		top: CLOSE_TOP
	}, 250, "easeOutQuad", function(){
		if(callback){
			callback.call();
		}
		$(shadow_root).hide();
	});
}
function reset(){
	shadow_content.querySelector("input").value = "";
	shadow_content.style.background = "#FFFFFF";
	data.url = "";
	data.title = "";
	data.notes = "";
	qCount = 0;
}

function feedback(msg, show_link){
	var h = msg;
	if(show_link){
		var src = chrome.extension.getURL("options.html");
		h += "<br/>View <a target='_blank' href='" + src + "'>options page</a> for more info."
	}
	var f = shadow_content.querySelector(".feedback");
	f.innerHTML = h;
	f.style.display = "block";
	window.clearTimeout(feedback.timer);
	feedback.timer = window.setTimeout(function(){
		f.style.display = none;
	}, 10000);
}
feedback.timer = null;

$(document).on("keydown", function(e){
	if(e.shiftKey){
		shiftPressed = true;
	}
});
$(document).on("keyup", function(e){
	if(shadow_root == null){
		return;
	}
	//console.log(e.keyCode);
	if(e.keyCode == keys.SHOW && shiftPressed){
		qCount++;
	}
	else{
		qCount = 0;
		if(!e.shiftKey){
			shiftPressed = false;
		}
		if(e.keyCode == keys.SAVE && canSave){
			//save
			canSave = false;
			data.notes = shadow_content.querySelector("input").value.trim();
			data.title = document.title;

			chrome.runtime.sendMessage({msg: "save_url", data: data}, function(response) {
				if(response.results == "error"){
					feedback(response.message, true);
				} else {
					shadow_content.style.background = "#d3ffca";
					closeDrawer(reset);
				}
			});
		}
		else if(e.keyCode == keys.EXIT){
			//exit
			canSave = false;
			closeDrawer(reset);
		}
	}

	if(qCount >= 2){
		openDrawer();
	}
});


chrome.runtime.sendMessage({msg: "fetch_html"}, function(response){
	$(document.body).append(response.html); //using innerHtml screws up events
	var temp = document.querySelector("#bm_extension_bookmark");
	shadow_root = document.querySelector("#bm_extension_shadow_root");
	shadow_root.createShadowRoot().appendChild(document.importNode(temp.content, true));
	shadow_content = document.querySelector("#bm_extension_shadow_root::shadow .content");
});


//messages sent by popup
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.cmd == "open_drawer"){
			openDrawer();
		}
	}
)
