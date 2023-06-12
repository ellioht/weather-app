import axios from 'axios'

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

export class ApiClient {
    //Method to get the weather data from the API, called when class is created with new keyword.
    constructor() {
        // Create an instance of Axios, a popular JavaScript library for making HTTP requests
        this.apiClient = axios.create({
            // Set the base URL for the API requests to 'https://api.openweathermap.org/data/2.5/'
            baseURL: 'https://api.openweathermap.org/data/2.5/'
        })
    }

    // Define a method called 'getWeather' which takes a 'city' parameter
    getWeather(city) {
        // Use the Axios instance (apiClient) to make a GET request to the OpenWeatherMap API
        // The endpoint being called is `weather`
        // The query parameters are provided as a string: `q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        // The `city` parameter is the name of the city for which weather data is requested
        // The `process.env.REACT_APP_WEATHER_API_KEY` represents the API key for the OpenWeatherMap API, which is stored in an environment variable
        // The `units=metric` parameter is used to specify the temperature unit as Celsius
        return this.apiClient.get(`weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
    }
}
