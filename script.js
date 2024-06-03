const apiKey = "a09dea8d307d0c9e66f4f61b9c415f6f";
let cityName = "delhi";
const date = new Date();
function timeFormat(timing, timezone) {
  const unixTime = timing + timezone;
  const currentTime = new Date(unixTime * 1000);
  const utcTime = currentTime.toUTCString();
  const hour = Number(utcTime.slice(17, 19));
  const minute = utcTime.slice(23, 25);
  const time =
    hour >= 12 ? hour - 12 + ":" + minute + " pm" : hour + ":" + minute + " am";
  return { time, currentTime };
}

function weatherApp() {
  try {
    const weather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if(data.message) alert(data.message);
      // console.log(data);
      const currentTime = timeFormat(data.dt, data.timezone);
      const sunriseTime = timeFormat(data.sys.sunrise, data.timezone);
      const sunsetTime = timeFormat(data.sys.sunset, data.timezone);

      $(".town").html(data.name);
      $(".time").html(date.toDateString());
      $(".icon").attr(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      $(".condition").html(data.weather[0].description);
      $(".temperature").html(data.main.temp + "&deg;C");
      $(".wind").html(`${data.wind.speed} m/s`);
      $(".humidity").html(`${data.main.humidity} %`);
      $(".sunrise").html(sunriseTime.time);
      $(".sunset").html(sunsetTime.time);

      if (currentTime.currentTime >= sunsetTime.currentTime ) {
        $(".progressing").css("transform", `rotate(0deg)`);
      } else if (currentTime.currentTime <= sunriseTime.currentTime) {
        $(".progressing").css("transform", `rotate(-180deg)`);
      } else {
        const distance = sunsetTime.currentTime - sunriseTime.currentTime;
        const currentPos = currentTime.currentTime - sunriseTime.currentTime;
        const rotate = (180 * currentPos) / distance - 180;
        $(".progressing").css("transform", `rotate(${rotate}deg)`);
      }
    };
    weather();
  } catch (error) {
    console.log("Catch error here...", error);
  }
}

weatherApp();