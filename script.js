    var cityInput;
    var futureWeatherArray = [$("#futureWeather1"), $("#futureWeather2"), $("#futureWeather3"), $("#futureWeather4"), $("#futureWeather5")]
    console.log(futureWeatherArray)




    $("#search-button").on("click", function() {
        runWeather();
    })

    function runWeather() {
        $("#current-weather").empty();
        $(".future").empty();
        cityInput = $("#searchInput").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&APPID=939ad0b6cedd44f5fb928d91af5bb6c2"
            // ajax call for current weather
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            var city = cityInput;
            var temperatureK = response.main.temp;
            var temperatureDec = (1.8 * (temperatureK - 273) + 32)
            var temperature = temperatureDec.toFixed(2);
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=939ad0b6cedd44f5fb928d91af5bb6c2&lat=" + latitude + "&lon=" + longitude;
            var cityID = response.id;
            var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=939ad0b6cedd44f5fb928d91af5bb6c2"
                // ajax call for UV index
            $.ajax({
                url: uvQueryURL,
                method: "GET"
            }).then(function(responseUV) {
                var uvIndex = responseUV.value;
                // appending to the current weather row
                var currentWeather = $(`<div>
                                <div id="title-and-date">${city + " " + moment().format('MMMM Do YYYY')}</div>
                                <div id="temp-current">temperature: ${temperature}f</div>
                                <div id="humidity-current">Humidity: ${humidity}%</div>
                                <div id="wind-speed-current">Wind: ${windSpeed}mph</div>
                                <div id="uv-current">UV-Index: ${uvIndex}</div>
                            </div>`);
                $("#current-weather").append(currentWeather);
                console.log(response.weather.id)
                    //    supposed to add icon based on weather attribute
                if (parseInt(response.weather[0].id) > 800) {
                    $("#title-and-date").append(' <i class="fas fa-cloud"></i>')
                } else if (response.weather[0].id === 800) {
                    $("#title-and-date").append(`<i class="fas fa-sun"></i>`)
                } else if (response.weather[0].id > 700 && response.weather.id < 800) {
                    $("#title-and-date").append(`  <i class="fas fa-poo-storm"></i>`)
                } else if (response.weather[0].id > 600 && response.weather.id < 700) {
                    $("#title-and-date").append(` <i class="fas fa-snowflake"></i>`)
                } else if (response.weather[0].id > 300 && response.weather.id < 600) {
                    $("#title-and-date").append(` <i class="fas fa-cloud-rain"></i>`)
                } else if (response.weather[0].id > 200 && response.weather.id < 300) {
                    $("#title-and-date").append(` <i class="fas fa-bolt"></i>`)
                } else {
                    $("#title-and-date").append("No symbol found")
                }
                // If statement for changing uv index color
                if (uvIndex < 2) {
                    $("#uv-current").css("background-color", "green")
                } else if (uvIndex >= 3 && uvIndex < 6) {
                    $("#uv-current").css("background-color", "yellow")
                } else if (uvIndex >= 6 && uvIndex < 7) {
                    $("#uv-current").css("background-color", "orange")
                } else if (uvIndex >= 7 && uvIndex < 9) {
                    $("#uv-current").css("background-color", "red")
                } else if (uvIndex >= 9) {
                    $("#uv-current").css("background-color", "violet")
                }
            })
            $.ajax({
                url: queryURL5,
                method: "GET"
            }).then(function(response5) {
                console.log(response5)
                var count = 0;
                for (let i = 4; i < 40; i += 8) {
                    var dateTxt = response5.list[i].dt_txt;
                    var dayID = response5.list[i].weather[0].id;
                    var tempK = response5.list[i].main.temp;
                    var tempDec = (1.8 * (tempK - 273) + 32);
                    var temp5 = tempDec.toFixed(2)
                    console.log(temp5);
                    var symbol;
                    var humidity5 = response5.list[i].main.humidity;
                    if (parseInt(response5.list[i].weather[0].id) > 800) {
                        symbol = (' <i class="fas fa-cloud"></i>')
                    } else if (response5.list[i].weather[0].id === 800) {
                        symbol = (` <i class="fas fa-sun"></i>`)
                    } else if (response5.list[i].weather[0].id > 700 && response5.list[i].weather.id < 800) {
                        symbol = (` <i class="fas fa-poo-storm"></i>`)
                    } else if (response5.list[i].weather[0].id > 600 && response5.list[i].weather.id < 700) {
                        symbol = (` <i class="fas fa-snowflake"></i>`)
                    } else if (response5.list[i].weather[0].id > 300 && response5.list[i].weather.id < 600) {
                        symbol = (` <i class="fas fa-cloud-rain"></i>`)
                    } else if (response5.list[i].weather[0].id > 200 && response5.list[i].weather.id < 300) {
                        symbol = (` <i class="fas fa-bolt"></i>`)
                    } else {
                        symbol = ("No symbol")
                    }
                    var weather5 = $(`<div id="date5">Date: ${dateTxt}</div>
                    <div id="symbol5">${symbol}</div>
                    <div id="temp5">Temp: ${temp5}f</div>
                    <div id="humid5">Humidity: ${humidity5}%</div>`)

                    futureWeatherArray[count].append(weather5)
                    count++;
                }
            })

        })
    }