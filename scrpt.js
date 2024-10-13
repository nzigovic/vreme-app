const apiKey = "c1fae3076d0f012e1ad5785c44ea6f31";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=darmstadt";


async function getWeatherData(city) {
    let response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data)

 
}

getWeatherData()
