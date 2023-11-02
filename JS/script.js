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

    const sunriseUnixTimestamp = sunrise; 
    const timezoneOffset = timezone; 

    const date = new Date(sunriseUnixTimestamp * 1000); 
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffset * 1000);
    const sunriseTime = localTime.toTimeString().slice(0, 8);
    // for sunset time

    const { sunset } = data.sys

    const sunriseUnixTimestamps = sunset;
    const timezoneOffsets = timezone; 

    const dates = new Date(sunriseUnixTimestamps * 1000); 
    const utcTimes = dates.getTime() + dates.getTimezoneOffset() * 60000; 
    const localTimes = new Date(utcTimes + timezoneOffsets * 1000); 
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
    document.querySelector(".search-bar").value = "";
  }
});
weather.fetchWeather();


