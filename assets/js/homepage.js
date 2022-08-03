var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={b58f74b3a7c8d5c465fd7279c1dd70b4}"
var getCoordURL ='http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={b58f74b3a7c8d5c465fd7279c1dd70b4}'
var submitBtn = document.getElementById('submit')
var userInput = document.querySelector(".input")

// create a function that captures the users input
function captureUserInput(event) {
event.preventDefault();

getCoords(userInput.value)

}
// create a function that receives the users city and runs the getCoord endpoint
function getCoords(city) {

    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=b58f74b3a7c8d5c465fd7279c1dd70b4")
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      
      // oneCallApi()
    })
}
  // get cityName from input element
function oneCallApi(lat, lon){

}


// pass the content needed for the one call api to retrieve all data needed for the html





submitBtn.addEventListener('submit', captureUserInput)