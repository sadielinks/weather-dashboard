// Set up API key per https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys 
// var APIKey = 'f18e1d06a58117a9f630af5002d9adef'

// // fetching via bithacker <3
// function weatherBalloon( cityID ) {
//     var key = 'f18e1d06a58117a9f630af5002d9adef';
//     fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
//     .then(function(resp) { return resp.json() }) // Convert data to json
//     .then(function(data) {
//       console.log(data);
//     })
//     .catch(function() {
//       // catch any errors
//     });
//   }
//   window.onload = function() {
//     weatherBalloon( 4887398 );
//   }

//Hmm... let's leave room to try ajax as well...


// Function 1 - format the doc to layout 
$(document).ready(function () {

    // let's make the search button do it's thang
    $('#searchBtn').on('click', function (event) {
        event.preventDefault();
        //
        var searchForCityHere = $('#searchforcityhere').val().trim();
        if (searchForCityHere != '') {
            searchListBtns(searchForCityHere) = true;
            localStorage.setItem('searchListBtns', JSON.stringify(searchListBtns));
        }
    })

    // prevent displaying old search results 
    var searchListBtns = JSON.parse(localStorage.getItem('searchListBtns'));
    // if statment so user cannot submit an 'empty' search, thx stackoverflow
    if (searchListBtns === null) {
        searchListBtns = {};
    }
})

// function formatWeather


// Function 2 - search panel + buttons
function citySearchBtns (searchListBtns) {
    var searchDataReturn = Object.keys(searchListBtns);
    console.log(searchDataReturn)
}


// Function 3 - generate the search result
// function generateSearchResults