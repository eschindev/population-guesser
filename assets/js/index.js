var cityName;
var cityNameHtml = $("<h3>");
var cityNameArea = $('#city-name');
var cityLat;
var cityLon;
// var OpenCageApi = "d05c7ded07e944bca02c922313d20342";


var randomCityNum = Math.floor(Math.random() * 602086);
console.log(randomCityNum);
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ccf2307e4emsh8e3c11c1c9072b3p1c42c2jsna3be4410cbd8',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};



fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&offset=${randomCityNum}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response);
        cityName = response.data[0].city;
        cityNameHtml.text(cityName);
        cityNameArea.append(cityNameHtml);
        console.log(cityName);
		cityLat = response.data[0].latitude;
		cityLon = response.data[0].longitude;

		var map = L.map('map').setView([cityLat, cityLon], 15);
		L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          attribution: 'Data <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, '
          + 'Map tiles &copy; <a href="https://carto.com/attribution">CARTO</a>'
        }).addTo(map);
		var marker = L.marker([cityLat, cityLon]);
		marker.addTo(map);

		// var mapRequestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityLat}+${cityLon}&key=${OpenCageApi}&pretty=1`;
		// fetch(mapRequestUrl)
		// 	.then(response=>response.json())
		// 	.then(response => {
        // 		console.log(response);})

    })
	.catch(err => console.error(err));

	
	
	
	