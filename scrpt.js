

const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";  
const searchBox = document.querySelector(".container input");
const searchBtn = document.querySelector("#getTemperature");
const clearHistoryBtn = document.querySelector("#clearHistory"); 
const historyList = document.querySelector("#history");

async function getWeatherData(city) {
    try {
        let response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        let data = await response.json();
        
        if (response.ok && data.main && data.weather) {
            const temperature = data.main.temp.toFixed(1);
            const cityName = data.name;

            document.querySelector(".grad").innerHTML = cityName;
            document.querySelector(".temp").innerHTML = temperature + "°C";

            saveCityToHistory(cityName, temperature);
        } else {
            console.log("API Greška:", data.message);
            document.querySelector(".grad").innerHTML = "Grad nije pronađen";
            document.querySelector(".temp").innerHTML = "";
            
        }
    } catch (error) {
        console.error("Došlo je do greške:", error);
    }
}

function saveCityToHistory(city, temperature) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const cityData = { city, temperature };
    
    if (!history.some(item => item.city === city)) {
        history.push(cityData);
        localStorage.setItem("searchHistory", JSON.stringify(history));
        renderHistory();
    }
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    historyList.innerHTML = "";
    history.forEach(({ city, temperature }) => {
        const li = document.createElement("li");
        li.textContent = `${city}: ${temperature}°C`;
        li.addEventListener("click", () => {
            searchBox.value = city;
            getWeatherData(city);
        });
        historyList.appendChild(li);
    });
}


clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem("searchHistory"); 
    renderHistory();
});


document.addEventListener("DOMContentLoaded", () => {
    renderHistory();
});

searchBtn.addEventListener("click", () => {
    getWeatherData(searchBox.value);
});



