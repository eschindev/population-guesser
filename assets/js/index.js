var cityName;
var cityLat;
var cityLon;
var cityPop;
var playerGuess;
var score;
// var OpenCageApi = "d05c7ded07e944bca02c922313d20342";
var weatherApiKey = "7979d5e84fdccdb02368a469751192e0";

var cityNameHtml = $('<h3>');
var cityNameArea = $('#city-name');
var playerInput = $('#user-input');
var postGameModal = $('#post-game-modal');   
var badInputModal = $('#bad-input-modal');
var playAgainBtn = $('.play-again-btn');
var hsTable = document.getElementById('hs-table');





var randomCityNum = Math.floor(Math.random() * 602086);
console.log(randomCityNum);
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ccf2307e4emsh8e3c11c1c9072b3p1c42c2jsna3be4410cbd8',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

// object to contain all functions related to the game
var game = {
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
	submitGuess: function(event) {
		event.preventDefault();
	
		playerGuess = parseInt($('#user-guess').val());
		if (isNaN(playerGuess) || playerGuess <= 0) {
			badInputModal.addClass('is-active');
			return;
		}
		game.calculateScore(playerGuess);
	},
	calculateScore: function(guess) {
		if (cityPop / guess < 1) {
			score = Math.round((1 - (cityPop / guess)) * 100);
		} else {
			score = Math.round((1 - (guess / cityPop)) * 100);
		}

    localStorage.setItem("pop-"+Date.now().toString(), score);

		postGameModal.addClass('is-active');
		$('#post-game-modal-body').html(`<p>You guessed ${playerGuess}, and the actual population of ${cityName} is ${cityPop}, so your score for this round is ${score}.</p>`);

    var convertUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${weatherApiKey}`;
    fetch(convertUrl)
        .then(response =>response.json())
        .then(data => {
            var currentDayHeader = $("<h2>").text(`${cityName} on ${dayjs().format("M/D/YYYY")}`);
            var postGameBody =$('#post-game-modal-body');
            postGameBody.append(currentDayHeader);
            var iconCode = data.weather[0].icon;
            var icon = $("<img>").attr("src", `https://openweathermap.org/img/w/${iconCode}.png`);
            postGameBody.append(icon);
            var currentTemp = $("<p>").html(`Temp: ${data.main.temp}&deg;F`);
            var currentWind = $("<p>").text(`Wind: ${data.wind.speed}mph`);
            var currentHum = $("<p>").text(`Humidity: ${data.main.humidity}%`);
            postGameBody.append(currentTemp, currentWind, currentHum);
        })
	},
	playAgain: function() {
		location.reload();
		return;
	}
}

playAgainBtn.on('click', game.playAgain);
playerInput.on('submit', game.submitGuess);
game.startGame();

	
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });

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

    var openTutorial = document.getElementById("tutorial-btn");

    openTutorial.addEventListener("click", function(){
      openModal(document.getElementById("tutorial-modal"))
    });

    var openSubmit = document.getElementById("submit-btn");

    // openSubmit.addEventListener("click", function(){
    //   openModal(document.getElementById("post-game-modal"))
    // });

  });