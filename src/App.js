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
            <h1>Sky Savvy Weather</h1>
          </div>
        </Row>
        <Row className="justify-content-center align-items-center">
          <WeatherCard day="Monday" text={weather && weather.daily[0].temp.day} img={weather && weather.daily[0].weather[0].icon} />
          <WeatherCard day="Tuesday" text={weather && weather.daily[1].temp.day} img={weather && weather.daily[1].weather[0].icon} />
          <WeatherCard day="Wednesday" text={weather && weather.daily[2].temp.day} img={weather && weather.daily[2].weather[0].icon} />
          <WeatherCard day="Thursday" text={weather && weather.daily[3].temp.day} img={weather && weather.daily[3].weather[0].icon} />
          <WeatherCard day="Friday" text={weather && weather.daily[4].temp.day} img={weather && weather.daily[4].weather[0].icon} />
        </Row>
      </Container>
    </>
  );
}

export default App;
