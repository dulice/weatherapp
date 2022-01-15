let cityName = "taunggyi";
let date = new Date();
const minute = date.getMinutes() < 10?
    "0" + date.getMinutes() :
    date.getMinutes();

const time = date.getHours() >= 12?
(date.getHours() - 12) + ":" + minute + " pm" :
date.getHours() + ":" + minute + " am";

function weatherApp () {
    try {
        const weather = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a09dea8d307d0c9e66f4f61b9c415f6f&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)

            $(".town").html(data.name);
            $(".time").html(time);
            $(".icon").attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            $(".condition").html(data.weather[0].description);
            $(".temperature").html(data.main.temp + "&deg;C");
            $(".min-max-temp").html(data.main.temp_min + "&deg;C / " + data.main.temp_max + "&deg;C");
            $(".wind").html(`wind speed : ${data.wind.speed} mph`);
        }
        weather();

    } catch (error) {
        console.log("Catch error here...", error);
    }
}

weatherApp();
$("#city").on("keyup", function(e) {
    e.preventDefault();
    if(e.key === "Enter") {   
        cityName = e.target.value;
        weatherApp();
        $("#city").val("");
    }    
})

