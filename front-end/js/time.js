/*
Utility functions for parsing date/time
*/

/* Gets timezone without daylight savings */
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

var TIME = (function(){
  var that = {}
      , months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function parseDateString(dateStr){
    //put in standard
    dateStr = dateStr.replace(" ", "T") + "Z";
  	var date = new Date(dateStr);
  	date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    return date;
  }

  function niceMonth(m){
    return months[m];
  }

  that.realDate = function(dateStr){
  	var date = parseDateString(dateStr);
  	var hour = date.getHours();
  	var min = date.getMinutes();
  	if(min < 10){
  		min = "0" + min;
  	}
  	var ampm = hour >= 12 ? "pm" : "am";
  	hour = (hour > 12) ? hour - 12 : hour;
  	hour = (hour == 0) ? 12 : hour;
  	return niceMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear() + " " + hour + ":" + min + ampm;
  }

  that.prettyDate = function(dateStr){
  	function pluralize(time, type){
  		if(time != 1){
  			return time + " " + type + "s" + " ago";
  		}
  		else{
  			return time + " " + type + " ago";
  		}
  	}
  	var pretty = "just now";
  	var date = parseDateString(dateStr);
  	var now = new Date();
  	var hourOff = now.stdTimezoneOffset()/60;
  	//hourOff is positive if the UTC offset is negative...ok...
  	now.setHours(now.getHours() - hourOff + 5);

  	var diff = now.getTime() - date.getTime();

  	if(diff < 1000){
  		pretty = "just now";
  	}
  	else if(diff < 60 * 1000){
  		pretty = pluralize(Math.round(diff/1000), "second");
  	}
  	else if(diff < 60 * 60 * 1000){
  		pretty = pluralize(Math.round(diff/(60 * 1000)), "minute");
  	}
  	else if(diff < 24 * 60 * 60 * 1000){
  		pretty = pluralize(Math.round(diff/(60 * 60 * 1000)), "hour");
  	}
  	else if(diff < 30 * 24 * 60 * 60 * 1000){
  		pretty = pluralize(Math.round(diff/(24 * 60 * 60 * 1000)), "day");
  	}
  	else if(diff < 12 * 30 * 24 * 60 * 60 * 1000){
  		pretty = pluralize(Math.round(diff/(30 * 24 * 60 * 60 * 1000)), "month");
  	}
  	else{
  		pretty = "over a year ago";
  	}
  	return pretty;
  }

  return that;
}());
