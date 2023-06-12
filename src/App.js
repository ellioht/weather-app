import React, { useState, useEffect } from "react";
import "./App.css";
import { ApiClient } from "./ApiClient";
import { Container, Row } from "react-bootstrap";
import WeatherCard from "./components/weatherCard";

function App() {
  const apiClient = new ApiClient();

  // Weather state
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.getWeather();
      setWeather(response.data);
    };
    fetchData();
  }, []);

  // Component rendering
  return (
    <>
      <Container fluid>
        <Row>
          <div className="App">
            <h1>Weather App</h1>
          </div>
        </Row>
        <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <WeatherCard text={weather && weather.daily[0].temp.day} />
          <WeatherCard text={weather && weather.daily[1].temp.day} />
          <WeatherCard text={weather && weather.daily[2].temp.day} />
          <WeatherCard text={weather && weather.daily[3].temp.day} />
          <WeatherCard text={weather && weather.daily[4].temp.day} />
        </Row>
      </Container>
    </>
  );
}

export default App;
