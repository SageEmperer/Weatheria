let weather = {
  "apiKey": "a24485f2546a53ef8471c896fc62ab44",
  fetchWeather: function (city = "Hyderabad") {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a24485f2546a53ef8471c896fc62ab44"

    ).then((response) => response.json())
      .then((data) => this.displayWeather(data));


  }, displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // getting sun rise time
    const { sunrise } = data.sys
    const { timezone } = data;

    const sunriseUnixTimestamp = sunrise; // Replace with your Unix timestamp
    const timezoneOffset = timezone; // Replace with your time zone's offset in seconds

    const date = new Date(sunriseUnixTimestamp * 1000); // Convert to milliseconds
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000; // Adjust for local time zone
    const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust for the provided time zone offset
    const sunriseTime = localTime.toTimeString().slice(0, 8);
    // for sunset time

    const { sunset } = data.sys

    const sunriseUnixTimestamps = sunset; // Replace with your Unix timestamp
    const timezoneOffsets = timezone; // Replace with your time zone's offset in seconds

    const dates = new Date(sunriseUnixTimestamps * 1000); // Convert to milliseconds
    const utcTimes = dates.getTime() + dates.getTimezoneOffset() * 60000; // Adjust for local time zone
    const localTimes = new Date(utcTimes + timezoneOffsets * 1000); // Adjust for the provided time zone offset
    const sunsetTime = localTimes.toTimeString().slice(0, 8);



    console.log(name, icon, description, temp, humidity, speed, sunrise, sunset, timezone, sunriseTime, sunsetTime);

    document.querySelector('.city').innerHTML = "Weather in " + name
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector('.description').innerText = description
    document.querySelector('.temp').innerText = parseInt((temp - 273.15)) + '°C'
    document.querySelector('#humidity').innerText = humidity
    document.querySelector('#wind').innerText = speed
    document.querySelector('#sunrise').innerText = sunriseTime
    document.querySelector('#sunset').innerText = sunsetTime


  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value)

  }


}
document.querySelector('#find')
  .addEventListener('click', function () {
    weather.search();
  });
document.querySelector('.search-bar').addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});
weather.fetchWeather();



// data={
//   "coord": {
//   "lon": 77.2167,
//   "lat": 28.6667
//   },
//   "weather": [
//   {
//   "id": 721,
//   "main": "Haze",
//   "description": "haze",
//   "icon": "50n"
//   }
//   ],
//   "base": "stations",
//   "main": {
//   "temp": 298.2,
//   "feels_like": 298.14,
//   "temp_min": 298.2,
//   "temp_max": 298.2,
//   "pressure": 1016,
//   "humidity": 53
//   },
//   "visibility": 2500,
//   "wind": {
//   "speed": 0,
//   "deg": 0
//   },
//   "clouds": {
//   "all": 0
//   },
//   "dt": 1698851626,
//   "sys": {
//   "type": 1,
//   "id": 9165,
//   "country": "IN",
//   "sunrise": 1698800560,
//   "sunset": 1698840399
//   },
//   "timezone": 19800,
//   "id": 1273294,
//   "name": "Delhi",
//   "cod": 200
//   }

//   console.log(data['name'])
//   console.log(data['main']['temp'])