var searchHistory = [];
var weatherApiRootUrl = "https://api.openweathermap.org";
var weatherApiKey = "b58f74b3a7c8d5c465fd7279c1dd70b4";

var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var searchHistoryContainer = document.querySelector("#history");
//Current Forecast
var todayContainer = document.querySelector("#today");
//5-Day Forecast
var forecastContainer = document.querySelector("#forecast");
var searchButton = document.querySelector("#search-button");

function renderSearchHistory() {
  searchHistoryContainer.innerHTML = "";

  for (let i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-controls", "today forecast");
    btn.classList.add("history-btn", "btn-history");

    btn.setAttribute("data-search", searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn);
  }
}

function appendToHistory(search) {
  searchHistory.push(search);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  renderSearchHistory();
}

//init
function initSearchHistory() {
  var storedHistory = localStorage.getItem("search-history");
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}

function renderCurrentWeather(city, weather) {
  var tempF = weather.temp;
  var windMph = weather.wind_speed;
  var humidity = weather.humidity;
  var uvi = weather.uvi;
  var date = new Date().toLocaleDateString();

  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var heading = document.createElement("h2");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");
  var uviEl = document.createElement("p");
  var uviBadge = document.createElement("button");

  heading.textContent = city + " " + date;
  tempEl.textContent = "Temp: " + tempF;
  windEl.textContent = "Wind: " + windMph;
  humidity.textContent = "Humidity:" + humidity;
  uviEl.textContent = "UVI:" + uvi;

  cardBody.append(heading, tempEl, windEl, humidityEl, uviEl, uviBadge);
  card.append(cardBody);
  todayContainer.append(card);
}

function renderForecast(daily) {
  var h1El = document.createElement("h1");
  h1El.textContent = "Forecast";
  console.log(daily);

  var div = document.createElement("div");

  for (let i = 1; i < daily.length - 2; i++) {
    var tempF = daily[i].temp.max;
    var windMph = daily[i].wind_speed;
    var humidity = daily[i].humidity;
    var today = new Date();
    var date = new Date(today);
    var formattedDate = date.setDate(date.getDate() + i);

    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var heading = document.createElement("h2");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");

    heading.textContent = new Date(formattedDate).toLocaleDateString();
    tempEl.textContent = "Temp: " + tempF;

    cardBody.append(heading, tempEl);
    card.append(cardBody);
    div.append(card);
  }

  forecastContainer.append(h1El, div);
}

function renderItems(city, data) {
  renderCurrentWeather(city, data.current);
  renderForecast(data.daily);
}

function fetchWeather(location) {
  var { lat } = location;
  var { lon } = location;
  var city = location.name;
  var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
      console.log(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoords(search) {
  var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("Gurl, Bye!");
      } else {
        appendToHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function start() {
  fetchCoords(searchInput.value);
}

searchButton.addEventListener("click", start);
initSearchHistory();
