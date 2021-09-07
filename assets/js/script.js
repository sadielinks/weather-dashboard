// ONEEEEEEEEEEEEEEEEEE search panel + buttons
function makeCitySearchBtns(searchListBtns) {


    // OH! adding this here now to stop the current values from adding on top of another, and rather replacing 
    $('#searchedcities').empty();
    $('#searchedcities').addClass('pt-2');

    var searchDataReturn = Object.keys(searchListBtns);
    console.log(searchDataReturn)
    // let's make previous searches buttons in the side panel with loops + dynamically adding btns
    for (var i = 0; i < searchDataReturn.length; i++) {
        var theButtonGroup = $('<button>');
        theButtonGroup.addClass('list-group-item list-group-item-action')

        // this is about to be the coolest thing I've learned yet
        // need to make a secondary loop so that the past searched city text appear on buttons, so I will use 'J' instead of another i, just like in math class heheh
        var makeCityNameCaps = searchDataReturn[i].toLowerCase().split('');
        // bringin in that j for the next integer
        for (var j = 0; j < makeCityNameCaps.length; j++) {
            // charAt will help have the first letter turn capital only, since the index begins at 0 (first letter)
            makeCityNameCaps[j] = makeCityNameCaps[j].charAt(0).toUpperCase + makeCityNameCaps[j].substring(1);
        }
        // prepend to the DOM
        var priorSearches = makeCityNameCaps.join('');
        CitySearchBtns.text(priorSearches);
        $('#searchedcities').prepend(theButtonGroup);
    }
}

// TWOOOOOOOOOOOOOOOOOOO generate the search result - office hours
function generateSearchResults(searchForCityHere, searchListBtns) {
    var APIKey = 'f18e1d06a58117a9f630af5002d9adef'
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&appid=" + APIkey + "&q=" + searchForCityHere;

    // will build the buttons previously searched
    makeCitySearchBtns(searchListBtns);

    // empty currently displayed content
    $('#tempnow, #windsnow, #humiditynow, #uvnow').empty();

    // the response lang comes directly from openweathermap <3
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (repsonse) {
        console.log(repsonse);

        var displayMomentHere = $('<h2>');
        var currentMoment = moment();

        // refresh + replace the displayed city name + current date (M/DD/YYYY) from moment.js
        $('citynamenow').empty();
        $('citynamenow').append(displayMomentHere.text(' (' + currentMoment.format('l') + ') '));

        // refresh + replace the displayed icon next to date
        var weatherIcon = $('<img>');
        weatherIcon.attr('src', "https://openweathermap.org/img/w/" + response.weather[0].icon + '.png');
        $('#iconsnow').empty();
        $('#iconsnow').append(weatherIcon);

        var cityName = $('<h2>').text(response.name);
        $('#citynamenow').prepend(cityName);

        // display temp
        // the data will come as K, so will need to convert it to °F
        // var convertKtoF = (response.main.temp - `273.15) × 9/5 + 32`)
        // 
        var tempNow = $('<p>').text('Temp: ' + convertKtoF + '°F');
        //  display winds + humidity
        var windsNow = $('<p>').text('Wind Speed: ' + response.wind.speed + 'MPH');
        var humidityNow = $('<p>').text('Humidity: ' + response.main.humidity + '%');


        // apend to the right places in DOM
        $('#tempnow').append(tempNow);
        $('#windsnow').append(windwsNow);
        $('#humiditynow').append(humidityNow);

        // build UV index variables
        var latitude = response.coord.lat;
        var longitude = repsonse.coord.lon;

        // pull UV index via openweathermap
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + latitude + "&lon=" + longitude;

        // display UV index using ajax
        $.ajax({
            url: uvQueryURL,
            method: 'GET'
        }).then(function (uvIndex) {
            console.log(uvIndex);
            var uvNow = $('<span>');

            // if/else statement + bootstrap to display UV conditions
            if (uvIndex.value < 2) {
                // green is favorable, levels 1-2
                uvNow.addClass('p-3 mb-2 bg-success text-white');
            } else if (uvIndex.value > 7) {
                // yellow being moderate, levels 3-7
                uvNow.addClass('p-3 mb-2 bg-warning text-dark');
            } else {
                // red is... severse lol help them, levels 8+
                uvNow.addClass('p-3 mb-2 bg-danger text-white');
            }
            // append UV value + color to the DOM
            uvNow.text(uvIndex.value);
            $('#uvnow').text('UV Index: ');
            $('#uvnow').append(uvNow);

            // now to build the 5 day card content!
            var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?&appid=" + APIKey + "&q=" + searchCity;
            var forecastWeather = $('#forecastWeather');
            forecastWeather.addClass('pt-3');

            $.ajax({
                url: forecastQueryUrl,
                method: 'GET'
            }).then(function (forecast) {
                console.log(forecast);

                // per openweathermap, things are updated every 3 hrs, 24 hrs from current, so set loop to continue the data pull 8 hours 
                for (var i = 7; i < forecast.list.length; i += 8) {
                    // display date in each card
                    var forecastDateDisplay = $('<h3>');

                    // using index for days 1-5
                    var forecastIndexID = (i + 1) / 8;
                    var forecastDayAdd = currentMoment.add(1, 'days').format('l');
                    console.log('#forecastdate-' + forecastIndexID, i, forecastDayAdd);
                    $('#forecastdate-' + forecastIndexID).empty();
                    $('#forecastdate' + forecastIndexID).append(forecastDateDisplay.text(forecastDayAdd));

                    var forecastIcon = $('<img>');
                    forecastIcon.attr('src', "https://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + '.png');
                    $('#forecast-icon-' + forecastIndexID).empty();
                    $('#forecast-icon-' + forecastIndexID).append(forecastIcon);
                    console.log(forecast.list[i].weather[0].icon);

                    // var convertKtoFAgain = (forecast.list[i].main.temp - `273.15) × 9/5 + 32`)
                    $('#tempday-' + forecastIndexID).text('Temp: ' + convertKtoFAgain + '°F');
                    $("#windsday-" + forecastIndexID).text("Winds: " + forecast.list[i].wind.speed + " MPH");
                    $('#humidityday-' + forecastIndexID).text('Humidity: ' + forecast.list[i].main.humidity + '%');
                }
            })
        }
        )
    }
    )
}

// THREEEEEEEEEEEEEEEEEE format the doc to layout 
$(document).ready(function () {
    var searchListBtns = JSON.parse(localStorage.getItem('searchListBtns'));

     // if statment so user cannot submit an 'empty' search, thx stackoverflow
     if (searchListBtns === null) {
        searchListBtns = {};
    }
    makeCitySearchBtns(searchListBtns)

    $("#currentWeather").hide();
    $("#forecastWeather").hide();

    // let's make the search button do it's thang
    $('#searchBtn').on('click', function (event) {
        event.preventDefault();
        //
        var searchForCityHere = $('#searchThatCity').val().trim().toLowerCase();;

        // save search to local storage with setItem
        if (searchForCityHere != '') {
            searchListBtns[searchForCityHere] = true;
            localStorage.setItem('searchListBtns', JSON.stringify(searchListBtns));

            generateSearchResults(searchForCityHere, searchListBtns);

            $('#currentWeather').show();
            $('#forecastWeather').show();
        }
    })

  $("#searchForCityHere").on("click", "button", function (event) {
    event.preventDefault();
    var searchForCityHere = $(this).text();

    generateSearchResults(searchForCityHere, searchListBtns);

    // Show these divs when a city list button is clicked
    $("#currentWeather").show();
    $("#forecastWeather").show();
  })
})

























// Set up API key per https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys 
// var APIKey = 'f18e1d06a58117a9f630af5002d9adef'
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchForCityHere + "&appid=" + APIKey;
// var weatherUrl = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={' + APIKey
// 


// // fetching via bithacker <3
// fetch('https://api.openweathermap.org/data/2.5/weather?id=&appid=' + APIKey)  
//     .then(function(resp) { return resp.json() }) // Convert data to json
//     .then(function(data) {
//       console.log(data);
//     })
//     .catch(function() {
//       // catch any errors
//     });
// //   window.onload = function() {
// //     weatherBalloon( 4887398 );
// //   }

// Hmm... let's leave room to try ajax as well...