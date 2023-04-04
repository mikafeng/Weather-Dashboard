# Weather Dashboard
This application utilizes open weather map’s 5 day weather forecast and current weather API to create a weather dashboard.

Link to deployed site: https://mikafeng.github.io/Weather-Dashboard/

## Project Description

The user enters the name of a city in the search field, then clicks the search button.

The app will display the current weather conditions in that city inlucding temperature, humidty, wind speed and picture representing the current weather conditions. Below, a 5-day forecast will be displayed.

Each time a user searches for a city, a button displaying that city is created below the search bar. When a city button is clicked, the browser will display the current weather and forecast for that city. Users may also click the "ClearHistory" button to clear local storage and remove searched city buttons from the page.

## Bugs/Challenges

The 5-day/3hr forecast api relays data for the 5 day forecast in 3 hour increments. I was unable to get the forecast for each 5 days and rather only was able to get the first 5 objects in the array returned (first 3 hour increments in the api).
