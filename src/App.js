import React, { useState, useEffect } from "react";
import "./App.css";
import { ApiClient } from "./ApiClient";
import { Container, Row } from "react-bootstrap";
import WeatherCard from "./components/weatherCard";

function App() {
  const apiClient = new ApiClient();

  // Weather state
  const [weather, setWeather] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  // useEffect for weather
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getWeather();
        setWeather(response.data);
        setWeatherData(response.data.daily.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
