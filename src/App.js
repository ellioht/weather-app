import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/searchBar.css";
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
  const [city, setCity] = useState('');
  const [capitalisedCity, setCapitalisedCity] = useState('');
  const handleSearch = (query) => {    
    const upperCaseCity = query.toUpperCase();
    // setCapitalisedCity(upperCaseCity);
    setLocation(upperCaseCity); 
  };

  // useEffect for weather
  useEffect(() => {
    const fetchData = async () => {
      try {
        const geoResponse = await apiClient.getCoordinates(location);
        setCapitalisedCity(geoResponse.data[0].name.toUpperCase());
        const lat = geoResponse.data[0].lat;
        const lon = geoResponse.data[0].lon;
       
        const response = await apiClient.getWeather(lat, lon);
        setCity(location);
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
    const currentDate = new Date(date * 1000);

    const day = days[currentDate.getDay()];
    
    return `${day}, `;
  };
  const getDateName = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date(date * 1000);

    const month = months[currentDate.getMonth()];
    const dayNumber = currentDate.getDate();
  
    return `${month} ${dayNumber}`;
  };
 

  
  // Component rendering
  return (
    <>
      <Container fluid>
        <Row>
          <div className="App">
            <h1>Sky Savvy Weather</h1>
            <h2>{capitalisedCity}</h2>
          </div>
        </Row>
        <Row className="justify-content-center align-items-center">
          <SearchBar className="search-bar" onSearch={(city) => handleSearch(city)} />          
        </Row>
        <Row className="justify-content-center align-items-center">
          {weatherData.map((data, index) => (
            <WeatherCard
              key={index}
              day={getDayName(data.dt)}
              date={getDateName(data.dt)}
              min={data.temp.min}
              max={data.temp.max}
              wind={data.wind_speed}
              img={data.weather[0].icon}
              description={data.weather[0].description}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
