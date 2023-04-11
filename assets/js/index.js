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
        var cityName = response.data[0].city;
        console.log(cityName);
    })
	.catch(err => console.error(err));