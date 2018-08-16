var main = (function (win, doc, geo, Math) {

	var distElement = doc.querySelector("#dist");
	var dist = 0;
	var ihm = {
		lat: -19.982181699999998,
		lon: -43.9745613
	};
	var geoOptions = {
		enableHighAccuracy: true
	};

	navigator.geolocation.watchPosition(treatPosition, treatError, geoOptions);

	function treatError(error) {
		erro.innerHTML = error.message;
		console.log(error);
	}


	function treatPosition(posicao) {
		dist = getDistanceFromLatLonInKm(posicao.coords.latitude, posicao.coords.longitude, ihm.lat, ihm.lon)
		distElement.innerHTML = (dist * 1000).toFixed(0);
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}

	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1);  // deg2rad above
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2)
			;
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	return {};

})(window, document, navigator.geolocation, Math)


// (function () {
// 	if ('serviceWorker' in navigator) {

// 	navigator.serviceWorker.register('sw.js')
// 		.then(function(reg) {
// 			// registration worked
// 			console.log('Registration succeeded. Scope is ' + reg.scope);
// 		}).catch(function(error) {
// 			// registration failed
// 			console.log('Registration failed with ' + error);
// 		});
// 	}
// })()
