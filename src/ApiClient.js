import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

// Sheffield = 53.381969832596965, -1.4778287729124848
// London = 51.5073219, -0.1276474
// Paris = 48.8566969, 2.3514616
// New York = 40.7127281, -74.0060152
// Sydney = -33.8548157, 151.2164539


export class ApiClient {

  // Define a method called 'getWeather' which takes a 'city' parameter
  getWeather(city) {
      const latitude = 53.381969832596965;
      const longitude = -1.4778287729124848;
      const exclude = 'hourly,minutely';
      const units = 'metric';

      // If a city is provided, use the city name in the API call
      let url;
      if (city) {
        url = `${BASE_URL}?q=${city}&exclude=${exclude}&units=${units}&appid=${apiKey}`;
        return axios.get(url);
      } else {
        url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&appid=${apiKey}`;
      }
      return axios.get(url);
    }
}
