import React, { useState, useEffect } from "react";
import "./App.css";
import { ApiClient } from './ApiClient'
import { Container } from "react-bootstrap";

function App() {

  // Weather state
  const [weather, setWeather] = useState(null);

  // Component rendering
  return (
    <>
      <Container>
        <div className="App">
          <h1>Weather App</h1>
        </div>
        <div className="App">
          <h1></h1>
        </div>
      </Container>
    </>
  );
}

export default App;
