import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/searchBar.css";
import { ApiClient } from "./ApiClient";
import { Container, Row, Col } from "react-bootstrap";
import WeatherCard from "./components/weatherCard";
import SummeryCard from "./components/summeryCard";
import SearchBar from "./components/searchBar";

function App() {
  const apiClient = new ApiClient();

  // Weather state
  const [weather, setWeather] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  // Summary for card index state
  const [cardIndex, setCardIndex] = useState(null);

  // Location state
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [capitalisedCity, setCapitalisedCity] = useState("");
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
        setCapitalisedCity(`${geoResponse.data[0].name}, ${geoResponse.data[0].country}`);
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
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date(date * 1000);

    const month = months[currentDate.getMonth()];
    const dayNumber = currentDate.getDate();

    return `${month} ${dayNumber}`;
  };

  const toggleSummary = (index) => {
    if (cardIndex === index) {
      setCardIndex(null);
    } else {
      setCardIndex(index);
    }
  };

  // Component rendering
  return (
    <div className={`App ${location !== "" ? 'flex-start' : ''}`}>
      <div className="title-head">
        <h1>Sky Savvy Weather <span className="copyright">©</span></h1>
      </div>

      <div className="search-container d-flex justify-content-center align-items-center">
        <SearchBar onSearch={(city) => handleSearch(city)} />
      </div>

      <div className="location">
        <h2>{capitalisedCity}</h2>
      </div>

      {location !== "" &&
      <div className="cards-container mt-2 mb-2">
        {weatherData.map((data, index) => {
          return (
            <div style={{ width: "21rem" }} key={index}>
              <WeatherCard
                day={getDayName(data.dt)}
                date={getDateName(data.dt)}
                temp={data.temp.day}
                min={data.temp.min}
                max={data.temp.max}
                img={data.weather[0].icon}
                description={data.weather[0].description}
                summary={() => toggleSummary(index)}
                wind={data.wind_speed}
              />
              {cardIndex === index && (
                <div className="summary-card-container">
                  <SummeryCard
                    className="summary-card"
                    sunrise={data.sunrise}
                    sunset={data.sunset}
                    humidity={data.humidity}
                    pressure={data.pressure}
                    uvi={data.uvi}
                    clouds={data.clouds}
                    rain={data.rain}
                    snow={data.snow}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      }
    </div>
  );
}

export default App;
