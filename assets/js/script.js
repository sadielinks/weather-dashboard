// Set up API key per https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys 
var APIKey = 'f18e1d06a58117a9f630af5002d9adef'

// // fetching via bithacker <3
    fetch('https://api.openweathermap.org/data/2.5/weather?id=&appid=' + APIKey)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
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




// Function 2 - search panel + buttons
function citySearchBtns(searchListBtns) {
    var searchDataReturn = Object.keys(searchListBtns);
    console.log(searchDataReturn)
    for (var i = 0; i < cityProperty.length; i++) {
        var theButtonGroup = $(':button');
        theButtonGroup.addClass('')
    }
}


// Function 3 - generate the search result
// function showThemResults