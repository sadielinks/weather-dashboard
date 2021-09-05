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
function generateSearchResults () {
    var APIKey = 'f18e1d06a58117a9f630af5002d9adef'
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchForCityHere + "&appid=" + APIKey;

    // will build the buttons previously searched
    citySearchBtns(searchListBtns);

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (repsonse) {
        console.log(repsonse);

        var displayMomentHere = $('<h2>');
        var currentMoment = moment();

        // refresh + replace the displayed city name
        $('#city-name').empty();
        $('#city-name').append(displayMomentHere.text(' (' + currentMoment.format('l') + ') ') );

        var cityName = $('<h2>').text(response.name);
        $('#cityname').prepend(cityName);
        weatherIcon.attr('src', "https://openweathermap.org/img/w/" + response.weather[0].icon + '.png');

        $('#iconsnow').empty();
        $('#iconsnow').append(weatherIcon);





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