const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";  
const searchBox = document.querySelector(".container input");
const searchBtn = document.querySelector("#getTemperature");

async function getWeatherData(city) {
    try {
        let response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        let data = await response.json();
        
        console.log(data); 

        if (response.ok) {
            document.querySelector(".grad").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = data.main.temp.toFixed(1) + "°C";
        } else {
            console.log("API Greška:", data.message);
            document.querySelector(".grad").innerHTML = "Grad nije pronađen";
            document.querySelector(".temp").innerHTML = "";
        }
    } catch (error) {
        console.error("Došlo je do greške:", error);
    }
}

function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        getWeatherData(searchBox.value.trim()); 
    }
}

searchBox.addEventListener("keypress", handleEnterKeyPress);


searchBtn.addEventListener("click", () => {
    console.log("Grad:", searchBox.value);  
    getWeatherData(searchBox.value);
});

getWeatherData("Berlin");
