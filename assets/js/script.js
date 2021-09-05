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




// generate the search result - office hours
function generateSearchResults() {
    var APIKey = 'f18e1d06a58117a9f630af5002d9adef'
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchForCityHere + "&appid=" + APIKey;

    // will build the buttons previously searched
    citySearchBtns(searchListBtns);

    // the response lang comes directly from openweathermap <3
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (repsonse) {
        console.log(repsonse);

        var displayMomentHere = $('<h2>');
        var currentMoment = moment();

        // refresh + replace the displayed city name
        $('citynamenow').empty();
        $('citynamenow').append(displayMomentHere.text(' (' + currentMoment.format('l') + ') '));

        var cityName = $('<h2>').text(response.name);
        $('#citynamenow').prepend(cityName);

        // icon placement
        var weatherIcon = $('<img>');
        weatherIcon.attr('src', "https://openweathermap.org/img/w/" + response.weather[0].icon + '.png');

        $('#iconsnow').empty();
        $('#iconsnow').append(weatherIcon);

        // display temp
        // the data will come as K, so will need to convert it to °F
        // var convertKtoF =
        var tempNow = $('<p>').text('Temperature: ' + convertKtoF + '°F');

        //  display winds + humidity
        var windsNow = $('<p>').text('Wind Speed: ' + response.wind.speed + 'MPH');
        var humidityNow = $('<p>').text('Humidity: ' + response.main.humidity + '%');


        // apend to the right places in DOM
        $('#tempnow').append(tempNow);
        $('#windsnow').append(windwsNow);
        $('#humiditynow').append(humidityNow);

        // build UV index
        var latitude = response.coord.lat;
        var longitude = repsonse.coord.long;

        // pull UV index
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
            uvNow.text(uvIndex.value);
            $('#uvnow').text('UV Index: ');
            $('#uvnow').append(uvNow);

            // now to build the 5 day card content!
            var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?&appid=" + APIKey + "&q=" + searchCity;
            // var thisONE = 'https://api.openweathermap.org/data/2.5/forecast?q=' + 'citynamenow' '&appid=' + APIKey;
            var forecastWeather = $("#fivedayforecast");
            // 
            forecastWeather.addClass("pt-1");

            $.ajax({
                url: forecastQueryUrl,
                method: 'GET'
            }).then(function (forecast) {
                console.log(forecast);


            })
        }

        )


    }











// format the doc to layout 
$(document).ready(function () {

        // let's make the search button do it's thang
        $('#searchBtn').on('click', function (event) {
            event.preventDefault();
            //
            var searchForCityHere = $('#searchforcityhere').val().trim();

            // save search to local storage with setItem
            if (searchForCityHere != '') {
                searchListBtns(searchForCityHere) = true;
                localStorage.setItem('searchListBtns', JSON.stringify(searchListBtns));

                showThemResults(searchListBtns, searchListBtns);

                // display the current city selection
                $('#displayweathernow').show();
                // display the 5 day forecast cards
                $('#fivedayforecast').show();
            }
        })

        // hide the current city selection when not showin them results
        $('#displayweathernow').hide();
        // hide the 5 day forecast cards as well
        $('#fivedayforecast').hide();

        // prevent old search results in main display
        var searchListBtns = JSON.parse(localStorage.getItem('searchListBtns'));
        // if statment so user cannot submit an 'empty' search, thx stackoverflow
        if (searchListBtns === null) {
            searchListBtns = {};
        }

        // lol I'll need to make a function to have the previously searched cities appear in the side panel but let's come back for that later heheh...

    })

// function formatWeather
// // // // // // //


// search panel + buttons
function citySearchBtns(searchListBtns) {
            var searchDataReturn = Object.keys(searchListBtns);
            console.log(searchDataReturn)

            // let's make previous searches buttons in the side panel with loops + dynamically adding btns
            for (var i = 0; i < cityProperty.length; i++) {
                var theButtonGroup = $(':button');
                theButtonGroup.addClass('list-group-item list-group-item-action')

                // this is about to be the coolest thing I've learned yet
                // need to make a secondary loop so that the past searched city text appear on buttons, so I will use 'J' instead of another i, just like in math class heheh
                var makeCityNameCaps = searchDataReturn[i].toLowerCase().split('');
                // bringin in that j
                for (var j = 0; j < split.Str.length; j++) {
                    // charAt will help have the first letter turn capital only, since the index begins at 0 (first letter)
                    splitStr[j] = splitStr[j].charAt(0).toUpperCase()
                }
                // prepend to the DOM
                var priorSearches = splitStr.join('');
                citySearchBtns.text(makeCityNameCaps);
                $('#searchedcities').prepend(theButtonGroup);

            }
        }