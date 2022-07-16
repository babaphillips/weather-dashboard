var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
var getCoordURL ='http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}'
var location = document.getElementById('location')
var submitBtn = document.getElementById('location-search')

// create a function that captures the users input
function captureUserInput(event) {
event.preventDefault();

var userInput =  location.value;
getCoords(userInput)

}
// create a function that recieves the users city and runs the getCoord endpoint
function getCoords(city){
console.log(city)
}
// pass the content needed for the onecall api to retreive all data needed for the html




submitBtn.addEventListener('submit', captureUserInput)