const forecast = $(".forecast");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const min_max = (value) => {
  const humidity = value.reduce((acc, value) => Math.min(acc, value.main.humidity), value[0].main.humidity);
  const minTemp = value.reduce((acc, value) => Math.min(acc, value.main.temp_min), value[0].main.temp_min);
  const maxTemp = value.reduce((acc, value) => Math.max(acc, value.main.temp_max), value[0].main.temp_max);
  return [humidity, minTemp, maxTemp]
}

const forecastData = async () => {
  try {
    forecast.html("")
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const lists = data.list;
    const group = Map.groupBy(lists, ({dt_txt}) => 
      days[new Date(dt_txt).getDay()]
    )
    const today = group.entries().next().value;
    const [, minTemp, maxTemp] = min_max(today[1]);
    $(".min-max-temp").html(
      minTemp + "&deg;C / " + maxTemp + "&deg;C"
    );
  
    group.forEach((value, key) => {
      const [humidity, minTemp, maxTemp] = min_max(value);
      forecast.append(`
                      <tr>
                        <td>${today[0] === key ? "Today" : key}</td>
                        <td>
                          <i class="fas fa-droplet"></i>
                          <small>${humidity}%</small>
                        </td>
                        <td>${minTemp}&deg;C</td>
                        <td>${maxTemp}&deg;C</td>
                      </tr>          
                  `);
    })
  } catch (error) {
    console.log(error)
  }
};
forecastData();
$(".form-submit").on("submit", function (e) {
    e.preventDefault();
    cityName = $("#city").val();
    weatherApp();
    forecastData();
    $("#city").val("");
  });