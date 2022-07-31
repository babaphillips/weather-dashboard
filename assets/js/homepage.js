var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={b58f74b3a7c8d5c465fd7279c1dd70b4}"
var getCoordURL ='http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={b58f74b3a7c8d5c465fd7279c1dd70b4}'
var submitBtn = document.getElementById('submit')

// create a function that captures the users input
function captureUserInput(event) {
event.preventDefault();


captureUserInput()
var userInput =  input.value;

getCoords(userInput)

}
// create a function that receives the users city and runs the getCoord endpoint
function getCoords(city) {
    
}
  // get cityName from input element



// pass the content needed for the one call api to retrieve all data needed for the html





submitBtn.addEventListener('submit', captureUserInput)