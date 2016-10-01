var lightList = new Array();

var getLight = function(input) {
	for(var i = 0; i < lightList.length; i++) {
		console.log("List list item ", lightList[i]);
		if(lightList[i].label.toUpperCase() == input.toUpperCase()) {
			return lightList[i];
		}
	}
}

var listTheLights = function () {
	lightList = new Array();
	$.ajax({
        url: 'https://api.lifx.com/v1/lights/all',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer cd51930ca220dd5b605ea11220b8ab32579fb04e2738b737cfea3c9f422e50dc")
        }, success: function(data){
            console.log(data);

            for(var i = 0; i < data.length; i++) {
            	// console.log(data[i].id);
            	lightList.push(data[i]);
            	console.log("Light: " + lightList[i].label + " Data: ", lightList[i]);
            }
        }
	})
}


/*
{
  "power": "on",
  "color": "blue saturation:0.5",
  "brightness": 0.5,
  "duration": 5
}
*/

var togglePower = function(input) {

	var light = getLight(input);

	var url = 'https://api.lifx.com/v1/lights/' + light.id +'/state';

	if(light.power == "off") {
		var data = { "power" : "on" };
	}
	else {
		var data = { "power" : "off" };
	}
	$.ajax({
        url: url,
        type : 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType   : "json",
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer cd51930ca220dd5b605ea11220b8ab32579fb04e2738b737cfea3c9f422e50dc")
        }, success: function(data){
            console.log(data);
            // for(var i = 0; i < data.length; i++) {
            // 	lightList.push(data[i]);
            // 	console.log("Light: " + lightList[i].label + " Data: ", lightList[i]);
            // }
        }
	})

	listTheLights();
}

window.onload = listTheLights;
