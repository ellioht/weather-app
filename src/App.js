import React, { useState, useEffect } from "react";
import "./App.css";
// import "./components/searchBar.css";
import { ApiClient } from "./ApiClient";
import { Container, Row } from "react-bootstrap";
import WeatherCard from "./components/weatherCard";
import SearchBar from "./components/searchBar";

function App() {
  const apiClient = new ApiClient();

  // Weather state
  const [weather, setWeather] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  // Location state
  const [location, setLocation] = useState('');
  const handleSearch = (query) => {
    setLocation(query);
  };


  // useEffect for weather
  useEffect(() => {
    const fetchData = async () => {
      try {
        const geoResponse = await apiClient.getCoordinates(location);
        const lat = geoResponse.data[0].lat;
        const lon = geoResponse.data[0].lon;

        const response = await apiClient.getWeather(lat, lon);
        console.log(location);
        setWeather(response.data);
        setWeatherData(response.data.daily.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  // Day / Date Name
  const getDayName = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentDate = new Date(date * 1000);
    const day = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const dayNumber = currentDate.getDate();
  
    return `${day}, ${month} ${dayNumber}`;
  };

  
  // Component rendering
  return (
    <>
      <Container fluid>
        <Row>
          <div className="App">
            <h1>Sky Savvy Weather</h1>
          </div>
        </Row>
        <Row className="justify-content-center align-items-center">
          <SearchBar onSearch={(city) => handleSearch(city)} />          
        </Row>
        <Row className="justify-content-center align-items-center">
          {weatherData.map((data, index) => (
            <WeatherCard
              key={index}
              day={getDayName(data.dt)}
              text={data.temp.day}
              img={data.weather[0].icon}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
