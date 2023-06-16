import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';

// Sheffield = 53.381969832596965, -1.4778287729124848
// London = 51.5073219, -0.1276474
// Paris = 48.8566969, 2.3514616
// New York = 40.7127281, -74.0060152
// Sydney = -33.8548157, 151.2164539
// Tokyo = 35.6828387, 139.7594549
// Rio = -22.9110137, -43.2093727
// Cape Town = -33.928992, 18.417396
// Moscow = 55.7504461, 37.6174943

export class ApiClient {

  // Define a method called 'getWeather' which takes a 'city' parameter
  getWeather(latitude, longitude, units) {
    const exclude = 'hourly,minutely';

    const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&appid=${apiKey}`;
    return axios.get(url);
  }
  getCoordinates(city) {
    const url = `${GEOCODING_API_URL}?q=${city}&limit=1&appid=${apiKey}`;
    return axios.get(url);
  }
}
