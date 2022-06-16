let date = new Date();
let hoursNow = document.querySelector("#hours");
hoursNow.innerHTML = date.getHours();
let minuteNow = document.querySelector("#minute");
minuteNow.innerHTML = date.getMinutes();
let weekDays = [
  "Sunday",
  "Monday",
  "Thursday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfWeek = document.querySelector("#day-week");
dayOfWeek.innerHTML = weekDays[date.getDay()];
let monthAll = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = document.querySelector("#month");
currentMonth.innerHTML = monthAll[date.getMonth()];
let currentDay = document.querySelector("#day-nomber");
currentDay.innerHTML = date.getDate();

let colorF = document.querySelector("#faringeit");
let colorC = document.querySelector("#celciy");
function unitF() {
  let tempf = document.querySelector("#temp");
  if (colorF.classList.contains("chColorC")) {
  } else {
    colorF.classList.add("chColorC");
    tempf.innerHTML = Math.round(parseFloat(tempf.innerHTML) * 1.8 + 32);
    colorF.classList.remove("chColorF");
    colorC.classList.add("chColorF");
    colorC.classList.remove("chColorC");
  }
}
let f = document.querySelector("#faringeit");
f.addEventListener("click", unitF);
function unitC() {
  let tempC = document.querySelector("#temp");
  if (colorC.classList.contains("chColorC")) {
  } else {
    tempC.innerHTML = Math.round((parseFloat(tempC.innerHTML) - 32) / 1.8);
    colorC.classList.add("chColorC");
    colorC.classList.remove("chColorF");
    colorF.classList.remove("chColorC");
    colorF.classList.add("chColorF");
  }
}
let c = document.querySelector("#celciy");
c.addEventListener("click", unitC);

let apiKey = "4826c8e04d4686528238e637fd752385";
let apiK = "4eba877dd9ec83758a66d7b35703d7cf";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let aUrl = "https://api.openweathermap.org/data/2.5/onecall?";

function currentPosition(position) {
  let lati = position.coords.latitude;
  let long = position.coords.longitude;
  currentUv(lati, long);
  axios
    .get(`${apiUrl}&lat=${lati}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(tempNow);
}
function getYourPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function tempNow(response) {
  let temperMax = Math.round(response.data.main.temp);
  let lt = response.data.coord.lat;
  let ln = response.data.coord.lon;
  let showMyTemp = document.querySelector("#temp");
  showMyTemp.innerHTML = `${temperMax}`;
  let myCity = document.querySelector("#city");
  myCity.innerHTML = response.data.name;
  let temperMin = Math.round(response.data.main.temp_min);
  let showMyTempMin = document.querySelector("#temperatureMin");
  showMyTempMin.innerHTML = temperMin;
  let wind = document.querySelector("#windKm");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let mainWeather = document.querySelector("#main-weather");
  mainWeather.innerHTML = response.data.weather[0].main;

  let sunTimeUp = new Date(response.data.sys.sunrise * 1000);
  let sunTimeDown = new Date(response.data.sys.sunset * 1000);
  let sunUpH = document.querySelector("#sunriseHours");
  sunUpH.innerHTML = sunTimeUp.getHours();
  let sunUpM = document.querySelector("#sunriseMinute");
  sunUpM.innerHTML = sunTimeUp.getMinutes();
  let sunDownH = document.querySelector("#sunsetHours");
  sunDownH.innerHTML = sunTimeDown.getHours();
  let sunDownM = document.querySelector("#sunsetMinute");
  sunDownM.innerHTML = sunTimeDown.getMinutes();
  axios
    .get(`${aUrl}&lat=${lt}&lon=${ln}&appid=${apiK}`)
    .then(function (response) {
      response.data.current.uvi;
      let uviDisplay = document.querySelector("#uvIndex");
      uviDisplay.innerHTML = Math.round(response.data.current.uvi);
    });
}

function currentUv(lati, long) {
  axios
    .get(`${aUrl}&lat=${lati}&lon=${long}&appid=${apiK}`)
    .then(function (response) {
      response.data.current.uvi;
      let uviDisplay = document.querySelector("#uvIndex");
      uviDisplay.innerHTML = response.data.current.uvi;
    });
}

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city-form");
  let city = document.querySelector("#city");
  city.innerHTML = inputCity.value;
  axios
    .get(`${apiUrl}&q=${inputCity.value}&appid=${apiKey}&units=metric`)
    .then(tempNow);
}
let form = document.querySelector("#input-form");
form.addEventListener("submit", search);

let buttonCurrentLocation = document.querySelector("#button-current-location");
buttonCurrentLocation.addEventListener("click", getYourPosition);
getYourPosition();
