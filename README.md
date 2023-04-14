# Pop Pursuit

## Overview
This webapp challenges users to guess the population of a random city from anywhere in the world. The user is given a score based on how close their guess is to the actual population. Top scores are saved in localStorage so users can see their progress and play as many times as they want.


![GIF of Deployed Site](./assets/images/Poppursuit%20GIF.gif)

The game can be played here: https://eschindev.github.io/population-guesser/

## How to Play
To play, simply load the page. Note the name of the city, examine the map to see where the city is located, and take a guess at its population. The closer your guess is to the actual population, the better (lower) your score will be.

## Features
This app uses the GeoDB API to source data for a random city, the Leaflet JavaScript library to render a map showing the location of that city, and the OpenWeatherMap API to source current weather data about the city, shown to the user after they submit their guess. 

This app also features responsive UI based on viewport size.


![GIF of responsive UI](./assets/images/Animated%20GIF.gif)

## Technologies Used
- HTML
- CSS
- JavaScript
- Bulma
- jQuery
- Day.js
- Leaflet
- GeoDB API
- OpenWeatherMap API

## Code Sample

This code makes a request to the GeoDB API to source info about a random city: 
```js
startGame: function() {
        fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&offset=${randomCityNum}`, options)
			      .then(response => response.json())
			      .then(response => {
                console.log(response);

                cityName = response.data[0].city;
                cityLat = response.data[0].latitude;
                cityLon = response.data[0].longitude;
                cityPop = response.data[0].population;
                cityNameHtml.text(cityName);
                cityNameArea.append(cityNameHtml);

                var map = L.map('map').setView([cityLat, cityLon], 15);

                L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                attribution: 'Data <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, '
                + 'Map tiles &copy; <a href="https://carto.com/attribution">CARTO</a>'
                }).addTo(map);

                var marker = L.marker([cityLat, cityLon]);
                marker.addTo(map);
            })
	          .catch(err => console.error(err));
    },
```

This code targets all buttons of class "score-btn" and adds an event listener that triggers the opening of the modal that displays the user's Top Scores, and populates the table therein from localStorage:

```js
var openScore = $(".score-btn");

    openScore.on("click", function(){
      openModal(document.getElementById("high-scores-modal"));

      var highScoresArr = [];
      for (i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          var value = localStorage.getItem(key);
          if(key.substring(0, 3) === 'pop') {
            highScoresArr.push(value);
          }
      }
      highScoresArr.sort(function(a, b) {
          return a - b;
      });
      for (i = hsTable.rows.length - 1; i > 0; i--) {
          hsTable.deleteRow(i);
      }
      for (let i = 0; i < highScoresArr.length; i++) {
          var row = document.createElement('tr');
          var scoreCell = document.createElement('td');
          console.log(highScoresArr);
          scoreCell.textContent = highScoresArr[i];
        
          row.appendChild(scoreCell);
          hsTable.appendChild(row);
      }
    });
```


## Contributors
- [David Chung](https://github.com/dchung13/)
- [Eugene Ogbeide](https://github.com/eogbeide424/)
- [Evan Schindler](https://github.com/eschindev/)

## License

MIT License
Copyright (c) [2023] [David Chung, Eugene Ogbeide, Evan Schindler]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Screenshot 

![Pop Pursuit Screenshot](./assets/images/pop-pursuit-screenshot.png)