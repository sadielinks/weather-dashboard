// Set up API key per https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys 
// var APIKey = 'f18e1d06a58117a9f630af5002d9adef'
// var APIurl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={208bb52da02da6dc8c524a6680d01cca'

// fetching via bithacker <3
function weatherBalloon( cityID ) {
    var key = 'f18e1d06a58117a9f630af5002d9adef';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  window.onload = function() {
    weatherBalloon( 4887398 );
  }