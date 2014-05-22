var API_ROOT = "http://localhost/bookmarks/back-end/index.php/";
var bRoot = $("<div id='bm_extension_bookmark'><h1>Bookmark Page</h1><input type='text' placeholder='Notes'/><div>Press <span>&lt;enter&gt;<span> to save<br/>Press <span class='red'>&lt;esc&gt;</span> to exit</div>");
var qCount = 0;
var canSave = false;
var shiftPressed = false;
var data = {
	url : "",
	title : "",
	notes : "",
	ispost: true
};
var keys = {
	EXIT : 27,
	SAVE: 13,
	SHOW: 81,
	HOLD : 16
}

function reset(){
	bRoot.find("input").val("");
	bRoot.css({
		background: "#000"
	});
	data.url = "";
	data.title = "";
	data.notes = "";
	qCount = 0;

}

bRoot.find("h1").html($("title").html());
$("body").append(bRoot);

$(document).on("keydown", function(e){
	if(e.keyCode == keys.HOLD){
		shiftPressed = true;
	}
});
$(document).on("keyup", function(e){
	//console.log(e.keyCode);
	if(e.keyCode == keys.SHOW && shiftPressed){
		qCount++;
	}
	else{
		qCount = 0;
		if(e.keyCode == keys.HOLD){
			shiftPressed = false;
		}
		if(e.keyCode == keys.SAVE && canSave){
			//save
			canSave = false;
			data.notes = $("#bm_extension_bookmark input").val().trim();
			data.title = $("title").html();
			bRoot.css({
				background: "#97FF7A"
			});
  			$.ajax({
  				url: API_ROOT + "bookmark/save",
  				method: "post",
  				data: data,
  				success: function(){
  					console.log("Saved");
  					bRoot.fadeOut(250, reset);
  				},
  				complete: function(data){
  					console.log(data);
  				}
  			});
		}
		else if(e.keyCode == keys.EXIT){
			//exit
			canSave = false;
			bRoot.fadeOut(250, reset);
		}
	}

	if(qCount >= 2){
		qCount = 0;
		canSave = true;
		bRoot.fadeIn(250, function(){
			bRoot.find("input").focus();
		});
		chrome.runtime.sendMessage({msg: "fetch_url"}, function(response) {
  			data.url = response.url;
		});
	}
});