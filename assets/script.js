//Open Weather API key
const weatherAPIkey = "c12c4ce8b0b76d9ef75f2410f8b28128";
//global vars
const submitButton = document.getElementById('submitBtn');
const searchHistoryEl = document.getElementById('lsOutput');
const clearEl = document.getElementById("clear-history");
let city;
let units = 'imperial';
let cityHistory = JSON.parse(localStorage.getItem("search")) || [];

//Submit Button click event
var buttonClickHandler = function(event) {
    event.preventDefault();
    getWeather();
    getForecast();
    saveSearch();
};

//save cities searched to array
function saveSearch(){
    let city = document.getElementById("city-search").value;
    cityHistory.push(city);
    localStorage.setItem("search",JSON.stringify(cityHistory));
    renderSearchHistory();
console.log(city)
    
};

//clear history
clearEl.addEventListener("click", function () {
   cityHistory = [];
    renderSearchHistory();
})

//render search history under search input
function renderSearchHistory(){
    searchHistoryEl.innerHTML="";
    for (let i=0; i<cityHistory.length; i++) {
        console.log(cityHistory);
        const searchItem = document.createElement("input");
        searchItem.setAttribute("type", "text");
        searchItem.setAttribute("readonly", true);
        searchItem.setAttribute("class", "form-control d-block bg-white");
        searchItem.setAttribute("value", cityHistory[i]);
        searchItem.addEventListener("click", function () {
            getWeather(searchItem.value);
            getForecast(searchItem.value);
    })
    searchHistoryEl.append(searchItem);
}
};



//Use current weather API to pull data for current weather of input city
function getWeather () {
    let city = document.getElementById("city-search").value;
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${weatherAPIkey}`

    fetch(queryUrl)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then((data) => {
            displayToday(data);
        })
        .catch(console.error);

};


//Use 5day 3Hr API to pull data for 5day forecast of input city
function getForecast () {
    let city = document.getElementById("city-search").value;
    let queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${weatherAPIkey}`;
    

    fetch(queryUrl)
        .then((response) => {
            if(!response.ok) throw new Error(response.status);
            return response.json();
        })
       .then((data) => {
            displayWeather(data);
        })
        .catch(console.error);
};

//Display current forecast from getWeather function
function displayToday(response){
    console.log(response);
    let row = document.querySelector('.currentWeather');
    let dt = new Date (response.dt*1000);
    row.innerHTML = 
    `<div class="container">
    <h1>${response.name}</h1>
    <h2>${dt.toDateString()}</h2>
    <div class="row">
    <h3 >Current Conditions: ${response.weather[0].main}</h3>
    <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png" alt="${response.weather[0].description}"/>
    </div>
    <p>High: ${response.main.temp_max} Low: ${response.main.temp_min}</p>
    <p>Wind Speed: ${response.wind.speed}</p>                        
    <p>Humidity: ${response.main.humidity}</p>
    </div>`
};

//Display 5 day forecast from the getForecast function
function displayWeather(response){
     console.log(response);
    let row = document.querySelector('.weatherMain');
    row.innerHTML = response.list
        .map((day, idx) =>{
            if (idx <= 4) {
                let dt = new Date (day.dt*1000);
        return `
        <div class="col">
            <div class="card">
                <h5 class="card-title p-2">${dt.toDateString()}</h5>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="card-img-top" alt="${day.weather[0].description}"/>
                <div class="card-body">
                    <h3 class="card-title">${day.weather[0].main}</h3>
                    <p class="card-text">High: ${day.main.temp_max} Low: ${day.main.temp_min}</p>
                    <p class="card-text">Wind Speed: ${day.wind.speed}</p>                        
                    <p class="card-text">Humidity: ${day.main.humidity}</p>
                </div>
            </div>
        </div>   
        `
        }
    })
        .join(' ');

};





submitButton.addEventListener('click', buttonClickHandler);


